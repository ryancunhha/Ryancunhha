const hamburguer = document.querySelector("#hamburguer")
const navMenu = document.querySelector(".opções")
const idioma = document.getElementById("idioma")
const bandeira = document.querySelector("#bandeira")

document.addEventListener("DOMContentLoaded", () => {
    const src = ["./src/ryan.jpg", "./src/ryan2.jpg"]
    const banner = document.getElementById("banner")
    let posiçãoAtual = 0

    setInterval(() => {
        banner.src = src[posiçãoAtual]
        posiçãoAtual = (posiçãoAtual + 1) % src.length

        console.log("funcionando")
    }, 4000);
})

hamburguer.addEventListener("click", () => {
    hamburguer.classList.toggle("active")
    navMenu.classList.toggle("active")
})

document.querySelectorAll("#link").forEach(n => n.addEventListener("click", () => {
    hamburguer.classList.remove("active")
    navMenu.classList.remove("active")
}))

idioma.addEventListener("change", () => {
    const idiomaAtual = idioma.value

    if (idiomaAtual === "BR") {
        bandeira.src = "./src/Idioma/br.png"
    } else if (idiomaAtual === "US") {
        bandeira.src = "./src/Idioma/us.png"
    }

    Lingua(idiomaAtual)
})

async function Lingua(langCode) {
    try {
        const res = await fetch(`./src/Idioma/${langCode.toLowerCase()}.json`)
        const dict = await res.json()

        document.querySelectorAll("[data-i18n]").forEach(el => {
            const chave = el.getAttribute("data-i18n")
            if (dict[chave]) {
                el.innerText = dict[chave]
            }
        })

        document.documentElement.lang = langCode.toLowerCase()
    } catch (error) {
        console.error("Erro ao carregar idioma", error)
    }
}
