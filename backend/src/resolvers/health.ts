import { Arg, Field, ObjectType, Query, Resolver } from "type-graphql";

@ObjectType()
export class HealthCheck {
  @Field()
  message: string = "success";
}

@Resolver((_of) => HealthCheck)
export class CustomHealthCheckResolver {
  @Query((_returns) => HealthCheck)
  async healthCheck(
    @Arg("message", { nullable: true }) message?: string
  ): Promise<HealthCheck> {
    return {
      message: message ?? "success",
    };
  }
}
