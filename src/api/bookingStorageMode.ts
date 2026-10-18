type BuildEnvironment = {
  PROD: boolean;
};

export function shouldUseLocalBookingStore(environment: BuildEnvironment): boolean {
  return environment.PROD;
}
