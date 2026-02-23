module {
  type OldActor = {
    stripeConfig : ?{
      secretKey : Text;
      allowedCountries : [Text];
    };
  };

  type NewActor = {
    configuration : ?{
      secretKey : Text;
      allowedCountries : [Text];
    };
  };

  public func run(old : OldActor) : NewActor {
    { configuration = old.stripeConfig };
  };
};
