create type "public"."plazo_status_enum" as enum ('FINITE', 'INFINITE');

create type "public"."plazo_type_enum" as enum ('FINITE', 'INFINITE');

alter table "public"."Plazo" add column "type" plazo_type_enum null;

alter table "public"."Plazo" alter column "endDate" drop not null;

alter table "public"."Plazo" add constraint "check_date_range" CHECK ((("endDate" > "startDate") AND ("endDate" > CURRENT_DATE))) not valid;

alter table "public"."Plazo" validate constraint "check_date_range";

alter table "public"."Plazo" add constraint "check_plazo_type" CHECK ((((type = 'FINITE'::plazo_type_enum) AND ("endDate" IS NOT NULL)) OR (type <> 'FINITE'::plazo_type_enum))) not valid;

alter table "public"."Plazo" validate constraint "check_plazo_type";


