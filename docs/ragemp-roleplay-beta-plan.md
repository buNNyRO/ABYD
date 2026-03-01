# RAGE:MP Roleplay Gamemode — Viziune & plan de livrare (Beta)

## 1) Obiectiv produs
Proiectul livrează un gamemode Roleplay RAGE:MP scris de la 0, orientat spre:
- **performanță și scalabilitate** (100+ jucători activi, cu țintă 500);
- **arhitectură modulară** (sisteme independente, testabile, ușor de extins);
- **persistență sigură** (stare consistentă, fără spam de query-uri la acțiuni frecvente);
- **UX modern în CEF** (auth, HUD, inventory, interacțiuni in-game).

## 2) Scope "Beta" (MVP stabil)
### Must-have
1. **Autentificare CEF**
   - Login/Register la conectare.
   - Răspunsuri de validare clare (eroare/succes).
2. **Character bootstrap**
   - Spawn inițial + spawn la ultima poziție salvată.
   - Salvare periodică și la disconnect.
3. **Economy de bază**
   - `money` în stare server-side.
   - tranzacții atomice (`give/take/set`) + loguri.
4. **Framework comenzi**
   - parser `/comanda args...`;
   - permisiuni + cooldown;
   - admin basic (`/tp`, `/kick`, `/sethp`, `/setmoney`).
5. **Inventory minimal, performant**
   - model cu slot-uri;
   - mutare/adăugare/eliminare item;
   - stare live în memorie + persist în batch/debounce.
6. **Persist worker**
   - flush pe containere "dirty" la interval;
   - flush forțat la quit/operații critice.

### Nice-to-have după beta
- selecție multi-character;
- trade/shop;
- vehicle inventory;
- jobs/factions;
- phone/HUD complet.

## 3) Stack tehnologic recomandat

## Server-side (autoritate gameplay)
- **TypeScript** (Node.js LTS).
- **PostgreSQL** pentru date persistente.
- **Driver DB performant + query layer predictibil** (de ex. Kysely/Drizzle/Knex).
- **Worker de persist** pentru batch writes și coadă de loguri.

## Client-side (RAGE:MP)
- **TypeScript**.
- keybind/input handlers.
- bridge de evenimente către server (`callRemote`) și CEF (`browser.execute` / evenimente dedicate).

## CEF UI
- **Vite + React** (sau Vue).
- Store simplu (ex: Zustand / Pinia).
- comunicație strictă prin `mp.trigger(...)`.

## 4) Pipeline de comunicație (contract obligatoriu)
Flux standard:

`CEF UI -> Client Script -> Server Script -> Client Script -> CEF UI`

Exemplu login:
1. CEF: `mp.trigger("ui:auth:login", username, password)`
2. Client: `mp.events.callRemote("auth:login", username, password)`
3. Server: validează DB + rate-limit + session state
4. Server -> Client: `player.call("auth:result", [ok, message])`
5. Client -> CEF: eveniment UI cu rezultatul
6. Dacă `ok`: se închide UI, se cere spawn.

**Regulă:** CEF nu conține logică sensibilă; serverul este singura autoritate pentru validări critice.

## 5) Arhitectură modulară
Fiecare modul respectă aceeași structură:
- `index.ts` — bootstrap/registrare modul
- `service.ts` — reguli de business
- `events.ts` — handlers pentru evenimente locale/remote
- `repo.ts` — acces DB
- `types.ts` — tipuri/contracte
- `constants.ts` — config intern

Module cheie:
1. **core**: inițializare, DI container, workers, error hooks
2. **auth**: register/login, hashing, rate-limit, sesiune
3. **character**: load/create, spawn, save position
4. **commands**: parser, permission middleware, cooldown, audit
5. **money**: mutații money + anti-exploit + logs
6. **inventory**: containere, mutații atomice, dirty tracking, flush
7. **admin**: comenzi administrative + audit logs
8. **world**: safezones, spawn points, dimension/interior

## 6) Model de date (beta)
### Tabele
- `users` (account): `id`, `username`, `password_hash`, `created_at`, `last_login_at`
- `characters`: `id`, `user_id`, `name`, `pos_x`, `pos_y`, `pos_z`, `heading`, `money`, `last_seen_at`
- `inventory_items`: `id`, `owner_type`, `owner_id`, `slot`, `item_id`, `amount`, `meta_json`, `updated_at`
- `transaction_logs`: tranzacții economy
- `admin_logs`: acțiuni admin
- `auth_logs`: login/register attempts

### Indexuri minime
- `users(username)` unique
- `characters(user_id)`
- `inventory_items(owner_type, owner_id, slot)` unique
- `transaction_logs(character_id, created_at)`

## 7) Principii de performanță
1. **In-memory state** pentru inventory/economy/status activ.
2. **Debounce + batch writes**:
   - flush la ~5s după ultima modificare;
   - flush forțat la ~30s;
   - flush la disconnect;
   - tranzacții DB pentru operații trade/shop.
3. **Rate limit** pe auth și remote events sensibile.
4. **Fără query DB în loop/tick per player**.
5. **Logging async** în queue (fără blocaj pe thread principal).

## 8) Milestones de implementare

### M1 — Bootstrap infrastructură
- schelet proiect TS (server/client/ui);
- config central + logger;
- conectare PostgreSQL + migrări inițiale.

### M2 — Auth + Session
- CEF login/register funcțional;
- validări, hash, rate-limit;
- state sesiune server-side.

### M3 — Character + Spawn
- creare/încărcare character;
- spawn la ultima poziție;
- save periodic + disconnect.

### M4 — Commands + Admin Basic
- command bus;
- middleware de permisiuni/cooldown;
- set minim comenzi admin.

### M5 — Money + Logs
- service de money server-authoritative;
- jurnalizare tranzacții async.

### M6 — Inventory + Persist Worker
- containere în RAM;
- mutații de bază (move/add/remove);
- flush batch + debounce + force flush.

## 9) Criterii de acceptanță pentru Beta
- autentificare CEF stabilă (login/register);
- spawn + save position funcționale;
- command framework + admin de bază;
- money și inventory stabile sub utilizare simultană;
- fără spam de query-uri în acțiuni repetitive;
- loguri critice disponibile pentru audit.
