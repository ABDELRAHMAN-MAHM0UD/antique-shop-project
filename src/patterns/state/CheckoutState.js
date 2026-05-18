class IdleCheckoutState {
  constructor() {
    this.name = "idle";
  }

  canCheckout() {
    return true;
  }

  getMessage() {
    return "Ready for checkout";
  }
}

class ValidatingCheckoutState {
  constructor() {
    this.name = "validating";
  }

  canCheckout() {
    return false;
  }

  getMessage() {
    return "Checkout is being validated";
  }
}

class SuccessCheckoutState {
  constructor() {
    this.name = "success";
  }

  canCheckout() {
    return true;
  }

  getMessage() {
    return "Checkout completed successfully";
  }
}

class FailedCheckoutState {
  constructor() {
    this.name = "failed";
  }

  canCheckout() {
    return true;
  }

  getMessage() {
    return "Checkout failed. You can try again";
  }
}

export function createCheckoutState(stateName) {
  switch (stateName) {
    case "validating":
      return new ValidatingCheckoutState();

    case "success":
      return new SuccessCheckoutState();

    case "failed":
      return new FailedCheckoutState();

    default:
      return new IdleCheckoutState();
  }
}