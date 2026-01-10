# 🌐 CONFIGURAZIONE DOMINIO ARUBA PER GITHUB PAGES

## ✅ LOGHI CARICATI E PRONTI!

I 3 loghi sono stati caricati e rinominati correttamente:
- ✅ `logo-aiosha.png` → Logo AI OSHA (homepage)
- ✅ `logo-corso.png` → Logo Intelligenza Artificiale in Pratica (pagina corso)
- ✅ `logo-metodo.png` → Logo Metodo AI OSHA (extra)

---

## 🔴 PROBLEMA ATTUALE

Il dominio **aiosha.it** è registrato su Aruba ma **NON è configurato** per puntare a GitHub Pages.

Per questo motivo vedi la pagina arancione di Aruba che dice "Questo dominio è già registrato".

---

## 📝 SOLUZIONE: Configura DNS su Aruba

### STEP 1: Accedi al Pannello Aruba

1. Vai su: **https://www.aruba.it/**
2. Clicca **"Area Clienti"** in alto a destra
3. Inserisci le tue credenziali (username e password)

### STEP 2: Vai alla Gestione DNS

1. Nel pannello di controllo, trova **"Domini"** o **"Servizi"**
2. Clicca su **"aiosha.it"**
3. Cerca la sezione **"Gestione DNS"** o **"DNS Management"**
4. Clicca su **"Modifica"** o **"Gestisci"**

### STEP 3: Elimina Record Esistenti (se presenti)

Elimina eventuali record A o CNAME che puntano a Aruba hosting.

### STEP 4: Aggiungi i Record per GitHub Pages

**Record A (4 record):**

| Tipo | Host/Nome | Valore/Punta a | TTL |
|------|-----------|----------------|-----|
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |

**Note:**
- Il campo "Host/Nome" può essere chiamato anche "Sottodominio"
- Usa **@** oppure **lascialo vuoto** per indicare il dominio principale

**Record CNAME (per www):**

| Tipo | Host/Nome | Valore/Punta a | TTL |
|------|-----------|----------------|-----|
| CNAME | www | aliosaaaa.github.io | 3600 |

### STEP 5: Salva le Modifiche

1. Clicca **"Salva"** o **"Conferma"**
2. **Aspetta 30-60 minuti** per la propagazione DNS

---

## 🚀 STEP 6: Completa la Configurazione su GitHub

### A. Fai il Merge della Pull Request

👉 **https://github.com/Aliosaaaa/AI-osha/compare/main...claude/add-logos-courses-notx7**

1. Clicca **"Create Pull Request"**
2. Clicca di nuovo **"Create Pull Request"**
3. Clicca **"Merge Pull Request"**
4. Clicca **"Confirm Merge"**

### B. Attiva GitHub Pages

👉 **https://github.com/Aliosaaaa/AI-osha/settings/pages**

1. Sotto **"Source"**:
   - Branch: `main`
   - Folder: `/ (root)`
   - Clicca **"Save"**

2. Sotto **"Custom domain"**:
   - Scrivi: `aiosha.it`
   - Clicca **"Save"**

3. **Aspetta 2-3 minuti**, poi:
   - Torna sulla stessa pagina
   - Abilita **"Enforce HTTPS"** (casella di spunta)

---

## ✅ VERIFICA FINALE

### Dopo 5-10 minuti:

1. **Anteprima GitHub Pages:**
   👉 https://aliosaaaa.github.io/AI-osha/

   Dovresti vedere:
   - ✅ Form AWeber
   - ✅ Logo AI OSHA nella homepage
   - ✅ Logo corso nella pagina corso

2. **Dominio personalizzato (dopo propagazione DNS):**
   👉 https://aiosha.it

   Dovresti vedere lo stesso sito con il tuo dominio!

### Dopo 30-60 minuti:

3. **Test completo:**
   - https://aiosha.it → Funziona ✅
   - https://www.aiosha.it → Redirect automatico a aiosha.it ✅
   - Form AWeber funzionante ✅
   - Loghi visibili ✅

---

## 🔧 COMANDI DI DEBUG (opzionali)

Per verificare che i DNS siano configurati correttamente:

```bash
# Verifica record A
nslookup aiosha.it

# Verifica record CNAME
nslookup www.aiosha.it

# Verifica propagazione DNS globale
# Vai su: https://dnschecker.org/#A/aiosha.it
```

---

## ❓ FAQ ARUBA

**Q: Dove trovo la Gestione DNS su Aruba?**
A: Pannello → Domini → aiosha.it → Gestione DNS / DNS Management

**Q: Cosa faccio se non trovo "Gestione DNS"?**
A: Cerca "Modifica DNS", "DNS Settings", o contatta il supporto Aruba

**Q: Posso usare il redirect di Aruba invece dei record DNS?**
A: NO! Il redirect non funziona con HTTPS. Devi usare i record DNS.

**Q: Quanto tempo serve per la propagazione?**
A: Di solito 30-60 minuti, ma può richiedere fino a 24-48 ore.

---

## 📞 SUPPORTO

**Supporto Aruba:**
- Tel: 0575 0505 (Italia)
- Email: supporto@staff.aruba.it
- Chat: https://www.aruba.it/assistenza.aspx

**GitHub Pages Status:**
- https://www.githubstatus.com/

---

**Inizia ora con lo STEP 1!** Accedi ad Aruba e configura i DNS. 🚀
