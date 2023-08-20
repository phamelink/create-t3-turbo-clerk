import {
    AbilityBuilder,
    createMongoAbility,
    type MongoAbility,
} from "@casl/ability"

import { type UserRole } from "@acme/db"

export type Subjects = string
export type Actions =
    | "manage"
    | "create"
    | "read"
    | "update"
    | "delete"
    | string

export type AppAbility = MongoAbility<[Actions, Subjects]>
export type ACLObj = {
    action: Actions
    subject: Subjects
}

/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
const defineRulesFor = (role: UserRole, subject: Subjects) => {
    const { can, rules } = new AbilityBuilder<AppAbility>(createMongoAbility)

    if (role === "ADMIN") {
        can("manage", "all")
        // can(["read", "create", "update", "delete"], subject)
    } else if (role === "CLIENT") {
        can(["read"], "acl-page")
    } else {
        can(["read", "create", "update", "delete"], subject)
    }

    return rules
}

export const buildAbilityFor = (
    role: UserRole,
    subject: string,
): AppAbility => {
    const rules = defineRulesFor(role, subject)

    return createMongoAbility(rules)
}

export const defaultACLObj: ACLObj = {
    action: "manage",
    subject: "all",
}

export default defineRulesFor
