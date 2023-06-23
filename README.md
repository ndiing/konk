# [KonK]()

**`KonK`** dibaca **`Konek`**, pakai qalqalah

## Precondition

Pastikan **[Node js v18](https://nodejs.org/dist/v18.16.1/node-v18.16.1-x64.msi)** sudah terpasang pada komputer

```bash
> npm -v&node -v
8.17.0
v18.16.0
```

## Installation

```bash
> git clone https://github.com/ndiing/konk.git
> cd konk
```

## Start

```bash
> node dist/index.js
```

## [API]()

### [OtomaX]()

-   [x] **[OtomaX](./src/api/otomax/rest.http)**
-   [ ] **[OAuth](./src/api/auth/rest.http)**

### [Bank]()

-   [x] **[BNI Direct](./src/api/bank/bnidirect.rest.http)**
-   [x] **[KlikBCA Individual](./src/api/bank/ibank.rest.http)**
-   [ ] **[KlikBCA Bisnis](./src/api/bank/klikbca.rest.http)**
-   [x] **[Mandiri Cash Management](./src/api/bank/mcm2.rest.http)**
-   [x] **[iBBIZ BRI](./src/api/bank/newbiz.rest.http)**

### [Center]()

-   [x] **[Telegram](./src/api/center/telegram.rest.http)**
-   [x] **[WhatsApp](./src/api/center/whatsapp.rest.http)**
-   [x] **[XMPP](./src/api/center/xmpp.rest.http)**

### [Provider]()

-   [ ] **[DigiPOS Aja](./src/api/digiposaja/rest.http)**
-   [ ] **[SiDOMPUL](./src/api/sidompul/rest.http)**
-   [ ] **[RITA](./src/api/rita/rest.http)**
-   [ ] **[iSIMPEL](./src/api/isimpel/rest.http)**
-   [ ] **[SRIS](./src/api/sris/rest.http)**
-   [ ] **[Kiosgamer](./src/api/kiosgamer/rest.http)**

## Note

Pengembang menggunakan versi dari produk dibawah untuk melakukan pengembangan saat ini, pastikan menggunakan versi yang sama atau lebih tinggi

-   [x] Node js **v18**
-   [ ] SQL Server **2019**
-   [ ] OtomaX **4.1.4**

### Keterangan

-   [x] Wajib
-   [ ] Opsional
