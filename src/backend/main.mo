import Stripe "stripe/stripe";
import Array "mo:core/Array";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";
import Storage "blob-storage/Storage";
import MixinAuthorization "authorization/MixinAuthorization";
import OutCall "http-outcalls/outcall";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Set "mo:core/Set";
import Text "mo:core/Text";
import Nat32 "mo:core/Nat32";
import Timer "mo:core/Timer";
import Blob "mo:core/Blob";
import Float "mo:core/Float";
import Migration "migration";

(with migration = Migration.run)
actor {
  // Configure authorization functionality
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Configure blob storage functionality
  include MixinStorage();

  public type UserProfile = {
    name : Text;
    email : Text;
    createdAt : Time.Time;
    customPropFirms : [Text];
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func addCustomPropFirm(propFirm : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add custom prop firms");
    };

    switch (userProfiles.get(caller)) {
      case (null) {
        let newProfile : UserProfile = {
          name = "";
          email = "";
          createdAt = Time.now();
          customPropFirms = [propFirm];
        };
        userProfiles.add(caller, newProfile);
      };
      case (?existingProfile) {
        let hasPropFirm = existingProfile.customPropFirms.find(
          func(p) { p == propFirm }
        );

        if (hasPropFirm == null) {
          let updatedProfile = {
            existingProfile with
            customPropFirms = existingProfile.customPropFirms.concat([propFirm]);
          };
          userProfiles.add(caller, updatedProfile);
        };
      };
    };
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can get their own profile");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public type Account = {
    id : Text;
    owner : Principal;
    name : Text;
    accountType : Text;
    balance : Float;
    currency : Text;
    createdAt : Time.Time;
    updatedAt : Time.Time;
  };

  let accounts = Map.empty<Text, Account>();
  var accountIdCounter : Nat = 0;

  func generateAccountId() : Text {
    accountIdCounter += 1;
    "ACC" # accountIdCounter.toText();
  };

  public type AccountInput = {
    name : Text;
    accountType : Text;
    balance : Float;
    currency : Text;
  };

  public shared ({ caller }) func addAccount(input : AccountInput) : async Account {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add accounts");
    };

    let now = Time.now();
    let accountId = generateAccountId();

    let account : Account = {
      id = accountId;
      owner = caller;
      name = input.name;
      accountType = input.accountType;
      balance = input.balance;
      currency = input.currency;
      createdAt = now;
      updatedAt = now;
    };

    accounts.add(accountId, account);
    account;
  };

  public query ({ caller }) func getAccounts() : async [Account] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view accounts");
    };

    let isAdmin = AccessControl.isAdmin(accessControlState, caller);

    accounts.values().toArray().filter(
      func(account) {
        isAdmin or account.owner == caller;
      }
    );
  };

  public query ({ caller }) func getAccount(accountId : Text) : async ?Account {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view accounts");
    };

    switch (accounts.get(accountId)) {
      case (null) { null };
      case (?account) {
        if (account.owner == caller or AccessControl.isAdmin(accessControlState, caller)) {
          ?account;
        } else {
          Runtime.trap("Unauthorized: Can only view your own accounts");
        };
      };
    };
  };

  public shared ({ caller }) func updateAccount(accountId : Text, input : AccountInput) : async Account {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update accounts");
    };

    switch (accounts.get(accountId)) {
      case (null) {
        Runtime.trap("Account not found");
      };
      case (?existingAccount) {
        if (existingAccount.owner != caller) {
          Runtime.trap("Unauthorized: Can only update your own accounts");
        };

        let updatedAccount : Account = {
          id = existingAccount.id;
          owner = existingAccount.owner;
          name = input.name;
          accountType = input.accountType;
          balance = input.balance;
          currency = input.currency;
          createdAt = existingAccount.createdAt;
          updatedAt = Time.now();
        };

        accounts.add(accountId, updatedAccount);
        updatedAccount;
      };
    };
  };

  public shared ({ caller }) func deleteAccount(accountId : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete accounts");
    };

    switch (accounts.get(accountId)) {
      case (null) {
        Runtime.trap("Account not found");
      };
      case (?account) {
        if (account.owner != caller) {
          Runtime.trap("Unauthorized: Can only delete your own accounts");
        };

        accounts.remove(accountId);
        true;
      };
    };
  };

  // Stripe integration
  var configuration : ?Stripe.StripeConfiguration = null;

  public query ({ caller }) func isStripeConfigured() : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can check Stripe configuration");
    };
    configuration != null;
  };

  public shared ({ caller }) func setStripeConfiguration(config : Stripe.StripeConfiguration) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can set Stripe configuration");
    };
    configuration := ?config;
  };

  func getStripeConfiguration() : Stripe.StripeConfiguration {
    switch (configuration) {
      case (null) { Runtime.trap("Stripe must be configured first") };
      case (?config) { config };
    };
  };

  public shared ({ caller }) func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can check session status");
    };
    await Stripe.getSessionStatus(getStripeConfiguration(), sessionId, transform);
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create checkout sessions");
    };
    await Stripe.createCheckoutSession(getStripeConfiguration(), caller, items, successUrl, cancelUrl, transform);
  };

  public shared query ({ caller }) func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // === Payout tracking ===
  public type Payout = {
    payoutId : Text;
    owner : Principal;
    propFirm : Text;
    accountId : Text;
    amount : Float;
    currency : Text;
    payoutDate : Time.Time;
    invoiceDocument : ?Storage.ExternalBlob;
    certificateDocument : ?Storage.ExternalBlob;
  };

  let payouts = Map.empty<Text, Payout>();
  var payoutIdCounter : Nat = 0;

  func generatePayoutId() : Text {
    payoutIdCounter += 1;
    "PAYOUT" # payoutIdCounter.toText();
  };

  public type PayoutInput = {
    propFirm : Text;
    accountId : Text;
    amount : Float;
    currency : Text;
    payoutDate : Time.Time;
    invoiceDocument : ?Storage.ExternalBlob;
    certificateDocument : ?Storage.ExternalBlob;
  };

  public shared ({ caller }) func addPayout(input : PayoutInput) : async Payout {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add payouts");
    };

    // Verify that the account exists and belongs to the caller
    switch (accounts.get(input.accountId)) {
      case (null) {
        Runtime.trap("Account not found");
      };
      case (?account) {
        if (account.owner != caller) {
          Runtime.trap("Unauthorized: Can only create payouts for your own accounts");
        };
      };
    };

    let payoutId = generatePayoutId();

    let payout : Payout = {
      payoutId;
      owner = caller;
      propFirm = input.propFirm;
      accountId = input.accountId;
      amount = input.amount;
      currency = input.currency;
      payoutDate = input.payoutDate;
      invoiceDocument = input.invoiceDocument;
      certificateDocument = input.certificateDocument;
    };

    payouts.add(payoutId, payout);
    payout;
  };

  public query ({ caller }) func getPayouts() : async [Payout] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view payouts");
    };

    let isAdmin = AccessControl.isAdmin(accessControlState, caller);

    payouts.values().toArray().filter(
      func(payout) {
        isAdmin or payout.owner == caller;
      }
    );
  };

  public query ({ caller }) func getPayout(payoutId : Text) : async ?Payout {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view payouts");
    };

    switch (payouts.get(payoutId)) {
      case (null) { null };
      case (?payout) {
        if (payout.owner == caller or AccessControl.isAdmin(accessControlState, caller)) {
          ?payout;
        } else {
          Runtime.trap("Unauthorized: Can only view your own payouts");
        };
      };
    };
  };
};
