DROP TABLE IF EXISTS "events";
DROP SEQUENCE IF EXISTS events_id_seq;
CREATE SEQUENCE events_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1;

CREATE TABLE "public"."events" (
    "id" bigint DEFAULT nextval('events_id_seq') NOT NULL,
    "event_name" character varying(191) NOT NULL,
    "event_date" date NOT NULL,
    "event_time" time(0) without time zone NOT NULL,
    "location" character varying(191),
    "remarks" character varying(191),
    "created_at" timestamp(0) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" timestamp(0) DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
) WITH (oids = false);