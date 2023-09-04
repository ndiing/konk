// window.localStorage.access_token= "eyJ0eXAiOiJKV1QiLCJhbGciOiJQUzUxMiJ9.eyJleHAiOjE2OTM3OTQ0MDE0ODQsImlhdCI6MTY5Mzc5MDgwMTQ4NCwianRpIjoiOGVjOWJhMGMtODk3My00MjkyLTliYjMtYWJlNjA5N2RhNzdiIiwia29kZV9yZXNlbGxlciI6Ik9YMDAwMSIsInBlbmdpcmltIjoiKzYyODEyMzQ1Njc4OTAiLCJyb2xlcyI6WyJ1c2VyIl19.QLit_OtFz2KnPCx8zk3IIzuvORyITsOSI9D_PgICXxf2BarRsHC2x3ZrPajbwbCIh8BMIHsfUBDnqMPnQMTvxr-kJfPKwoybfGCCmarDvN5cGMO2MkDj4VwqqhQ1cgAPS2CNkTQ5_1nsp_WRKMmbvmWrjLsX2ozvX9BUIYogFC0UmS1OdV5jewJLlzRdnZraoRWAK_zcvM7XTUHZaUEx1Y224llSADHjzt-dtlqSKfVeQ2iywNZsTMTnsGiwboBTA8QEQ7DcP23WkwSrTdO3qASrrxEoLlqf8DrSvsc9DDpWIfKDsFyZSs12A9RDlgocQvqD0CncBk4OhoOtGazHSg",
// window.localStorage.refresh_token= "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJleHAiOjE2OTM4NzcyMDE0OTAsImlhdCI6MTY5Mzc5MDgwMTQ4NCwianRpIjoiOGVjOWJhMGMtODk3My00MjkyLTliYjMtYWJlNjA5N2RhNzdiIiwia29kZV9yZXNlbGxlciI6Ik9YMDAwMSIsInBlbmdpcmltIjoiKzYyODEyMzQ1Njc4OTAiLCJyb2xlcyI6WyJyZWZyZXNoIl19.k0E6M7D5iGH70zDI-qUb9VnBTEb-S9tZKZY_hbfJXCJ3z9NJmfLtZO9NTcWu-dQJB5W2WWJqs8lorS2ltqcyASx-X7nv7IBKs0H7aj6QA0ZSBxjDcV9vs4LCLoH78L_Q0deCGPXVcrf1iJ9w-6vDVy4_6p3wdZk4vroikvOFjoHg97S4a_ZYqZMTgT1oMAuPRrDJZP19KpKlG6TrcDtbxVIsPV3UsznrIpxjA1DVcJhP6UsMv2vs5V9HGRmZrhfyxnhuafWfjuLr3zVQVXF1QcA3m7fGr25rr0uq6OmLBoP0N2RCP44ozHjBsKerjODPANRJyDD0j8ABkMziXmYV8Q",

class Service {
    // Login
    static async signin(payload = {}) {
        const req = await fetch("http://127.0.0.1/api/auth/signin", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                username: payload.username,// "+6281234567890",
            }),
        });
        const res = await req.json();
        window.localStorage.access_token = res.access_token
        window.localStorage.refresh_token = res.refresh_token
        return res;
    }

    // @private Refresh
    static async refresh(payload = {}) {
        const req = await fetch("http://127.0.0.1/api/auth/refresh", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + window.localStorage.refresh_token,
            },
        });
        const res = await req.json();
        window.localStorage.access_token = res.access_token
        window.localStorage.refresh_token = res.refresh_token
        return res;
    }

    // @private Check
    static async check(payload = {}) {
        const req = await fetch("http://127.0.0.1/api/otomax/reseller", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + window.localStorage.access_token,
            },
        });
        // refresh token
        if(req.status===401){
            await this.refresh()
        }
        // next
    }

    static async reseller(payload = {}) {
        await this.check()

        const req = await fetch("http://127.0.0.1/api/otomax/reseller", {
            method: "GET",
            headers: {
                Authorization: "Bearer " + window.localStorage.access_token,
            },
        });
        const res = await req.json()
        return res
    }
}

// Service.signin({
//     username: "+6281234567890",
// }).then(console.log);
// Service.reseller({}).then(console.log);
