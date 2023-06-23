# [KonK]()

**`KonK`** dibaca **`Konek`**, pakai qalqalah

## Prasyarat

Pastikan **[Node js v18](https://nodejs.org/dist/v18.16.1/node-v18.16.1-x64.msi)** sudah terpasang pada komputer

```bash
> npm -v&node -v
8.17.0
v18.16.0
```

## Instalasi

[Download](https://github.com/ndiing/konk/archive/refs/heads/main.zip) aplikasi ini, atau clone menggunakan git

```bash
> git clone https://github.com/ndiing/konk.git
> cd konk
```

## Mulai

Pastikan sudah pada folder `konk`, dan jalankan perintah ini

```bash
> node dist/index.js
```

## [API]()

### [OtomaX]()

-   [x] **[OtomaX](./rest/otomax.http)**
-   [ ] **[OAuth](./rest/.http)**

### [Bank]()

-   [x] **[BNI Direct](./rest/bnidirect.http)**
-   [x] **[KlikBCA Individual](./rest/ibank.http)**
-   [ ] **[KlikBCA Bisnis](./rest/.http)**
-   [x] **[Mandiri Cash Management](./rest/mcm2.http)**
-   [x] **[iBBIZ BRI](./rest/newbiz.http)**

### [Center]()

-   [x] **[Telegram](./rest/telegram.http)**
-   [x] **[WhatsApp](./rest/whatsapp.http)**
-   [x] **[XMPP](./rest/xmpp.http)**

### [Provider]()

-   [ ] **[DigiPOS Aja](./rest/.http)**
-   [ ] **[SiDOMPUL](./rest/.http)**
-   [ ] **[RITA](./rest/.http)**
-   [ ] **[iSIMPEL](./rest/.http)**
-   [ ] **[SRIS](./rest/.http)**
-   [ ] **[Kiosgamer](./rest/.http)**

## Catatan

Pengembang menggunakan versi dari produk dibawah untuk melakukan pengembangan saat ini, pastikan menggunakan versi yang sama atau lebih tinggi

-   [x] Node js **v18**
-   [ ] SQL Server **2019**
-   [ ] OtomaX **4.1.4**

### Simbol

-   [x] Wajib
-   [ ] Opsional
