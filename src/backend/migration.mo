import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";

module {
  // Original UserProfile type without customPropFirms.
  type OldUserProfile = {
    name : Text;
    email : Text;
    createdAt : Time.Time;
  };

  type NewUserProfile = {
    name : Text;
    email : Text;
    createdAt : Time.Time;
    customPropFirms : [Text];
  };

  // Original actor state with accounts and old user profiles.
  type OldActor = {
    userProfiles : Map.Map<Principal, OldUserProfile>;
  };

  // New actor state with updated user profiles.
  type NewActor = {
    userProfiles : Map.Map<Principal, NewUserProfile>;
  };

  // Migration function to convert old actor state to new one.
  public func run(old : OldActor) : NewActor {
    let newUserProfiles = old.userProfiles.map<Principal, OldUserProfile, NewUserProfile>(
      func(_user, oldProfile) {
        {
          oldProfile with
          customPropFirms = [];
        };
      }
    );
    { userProfiles = newUserProfiles };
  };
};
