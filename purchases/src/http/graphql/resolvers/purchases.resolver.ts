import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";

import { PurchasesService } from "../../../services/purchases.service";
import { AuthorizationGuard } from "../../auth/authorization.guard";
import { Purchase } from "../models/purchase";


@Resolver()
export class PurchasesResolver {
  constructor(private purchasesService: PurchasesService) {}

  @Query(() => [Purchase])
  // @UseGuards(AuthorizationGuard)
  purchases() {
    return this.purchasesService.listAllPurchases();
  }

}