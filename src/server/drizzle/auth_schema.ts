import {
  boolean,
  index,
  jsonb,
  pgSchema,
  smallint,
  text,
  timestamp,
  unique,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const auth = pgSchema("auth");

export const users = auth.table(
  "users",
  {
    instance_id: uuid("instance_id"),
    id: uuid("id").primaryKey().notNull(),
    aud: varchar("aud", { length: 255 }),
    role: varchar("role", { length: 255 }),
    email: varchar("email", { length: 255 }),
    encrypted_password: varchar("encrypted_password", { length: 255 }),
    email_confirmed_at: timestamp("email_confirmed_at", {
      withTimezone: true,
      mode: "string",
    }),
    invited_at: timestamp("invited_at", { withTimezone: true, mode: "string" }),
    confirmation_token: varchar("confirmation_token", { length: 255 }),
    confirmation_sent_at: timestamp("confirmation_sent_at", {
      withTimezone: true,
      mode: "string",
    }),
    recovery_token: varchar("recovery_token", { length: 255 }),
    recovery_sent_at: timestamp("recovery_sent_at", {
      withTimezone: true,
      mode: "string",
    }),
    email_change_token_new: varchar("email_change_token_new", { length: 255 }),
    email_change: varchar("email_change", { length: 255 }),
    email_change_sent_at: timestamp("email_change_sent_at", {
      withTimezone: true,
      mode: "string",
    }),
    last_sign_in_at: timestamp("last_sign_in_at", {
      withTimezone: true,
      mode: "string",
    }),
    raw_app_meta_data: jsonb("raw_app_meta_data"),
    raw_user_meta_data: jsonb("raw_user_meta_data"),
    is_super_admin: boolean("is_super_admin"),
    created_at: timestamp("created_at", { withTimezone: true, mode: "string" }),
    updated_at: timestamp("updated_at", { withTimezone: true, mode: "string" }),
    phone: text("phone").default(""),
    phone_confirmed_at: timestamp("phone_confirmed_at", {
      withTimezone: true,
      mode: "string",
    }),
    phone_change: text("phone_change").default(""),
    phone_change_token: varchar("phone_change_token", { length: 255 }).default(
      "",
    ),
    phone_change_sent_at: timestamp("phone_change_sent_at", {
      withTimezone: true,
      mode: "string",
    }),
    confirmed_at: timestamp("confirmed_at", {
      withTimezone: true,
      mode: "string",
    }),
    email_change_token_current: varchar("email_change_token_current", {
      length: 255,
    }).default(""),
    email_change_confirm_status: smallint(
      "email_change_confirm_status",
    ).default(0),
    banned_until: timestamp("banned_until", {
      withTimezone: true,
      mode: "string",
    }),
    reauthentication_token: varchar("reauthentication_token", {
      length: 255,
    }).default(""),
    reauthentication_sent_at: timestamp("reauthentication_sent_at", {
      withTimezone: true,
      mode: "string",
    }),
    is_sso_user: boolean("is_sso_user").default(false).notNull(),
    deleted_at: timestamp("deleted_at", { withTimezone: true, mode: "string" }),
    is_anonymous: boolean("is_anonymous").default(false).notNull(),
  },
  (table) => {
    return {
      confirmation_token_idx: uniqueIndex("confirmation_token_idx").on(
        table.confirmation_token,
      ),
      email_change_token_current_idx: uniqueIndex(
        "email_change_token_current_idx",
      ).on(table.email_change_token_current),
      email_change_token_new_idx: uniqueIndex("email_change_token_new_idx").on(
        table.email_change_token_new,
      ),
      reauthentication_token_idx: uniqueIndex("reauthentication_token_idx").on(
        table.reauthentication_token,
      ),
      recovery_token_idx: uniqueIndex("recovery_token_idx").on(
        table.recovery_token,
      ),
      email_partial_key: uniqueIndex("users_email_partial_key").on(table.email),
      instance_id_email_idx: index("users_instance_id_email_idx").on(
        table.instance_id,
      ),
      instance_id_idx: index("users_instance_id_idx").on(table.instance_id),
      is_anonymous_idx: index("users_is_anonymous_idx").on(table.is_anonymous),
      users_phone_key: unique("users_phone_key").on(table.phone),
    };
  },
);
