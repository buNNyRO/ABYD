# RAGE:MP Roleplay Beta (Scaffold)

Acesta este un scaffold funcțional pentru gamemode-ul RP, separat de aplicația existentă ABYD.

## Ce conține
- server TypeScript modular (`core`, `auth`, `character`, `commands`, `money`, `inventory`, `admin`, `world`)
- client bridge TypeScript (CEF -> client -> server)
- CEF auth UI skeleton (event-driven)
- persist worker pentru inventory (debounce + force flush)

## Structură
- `server/src/core` bootstrap, event bus, persist queue
- `server/src/modules/*` module independente cu `index.ts/service.ts/events.ts/types.ts/repo.ts/constants.ts`
- `client/src` bridge de evenimente RAGE:MP client
- `cef/src` bridge pentru UI

## Notă
Fișierele sunt orientate pentru integrare rapidă într-un runtime RAGE:MP + PostgreSQL. Pentru producție, conectează repo-urile la `pg`/ORM-ul ales și leagă evenimentele de API-ul real RAGE:MP.
