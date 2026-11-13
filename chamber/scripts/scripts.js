const menuToggle = document.querySelector("#menu-btn")
const menu = document.querySelector(".menu")
const directoryList = document.querySelector(".directory-list")
const layoutButtons = document.querySelectorAll(".layout-btn")

if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("open")
        menu.classList.toggle("open")
        const isOpen = menuToggle.classList.contains("open")
        menu.setAttribute("aria-label", isOpen ? "Close Navigation Menu" : "Open Navigation Menu")
        menuToggle.setAttribute("aria-expanded", isOpen)
    })
}

const createDetailRow = (label, value, iconName, href) => {
    const row = document.createElement("div")
    const term = document.createElement("dt")
    const icon = document.createElement("img")
    const definition = document.createElement("dd")

    icon.src = `images/${iconName}`
    icon.alt = label
    term.append(icon)

    if (href) {
        const link = document.createElement("a")
        link.href = href
        link.textContent = value
        if (href.startsWith("http")) {
            link.target = "_blank"
            link.rel = "noopener noreferrer"
        }
        definition.append(link)
    } else {
        definition.textContent = value
    }

    row.append(term, definition)
    return row
}

const createMemberCard = (member) => {
    const card = document.createElement("details")
    card.className = "list-item"

    const summary = document.createElement("summary")
    summary.className = "list-item-header"

    const heading = document.createElement("h2")
    heading.className = "business-heading"

    const name = document.createElement("span")
    name.className = "business-name"
    name.textContent = member.name

    const tagline = document.createElement("span")
    tagline.className = "tag-line"
    tagline.textContent = member.tagline

    const indicator = document.createElement("span")
    indicator.className = "expand-indicator"
    indicator.setAttribute("aria-hidden", "true")
    heading.append(name, tagline, indicator)
    summary.append(heading)

    const details = document.createElement("div")
    details.className = "business-details"

    const image = document.createElement("img")
    image.src = `images/${member.image}`
    image.alt = member.imageAlt

    const info = document.createElement("div")
    info.className = "business-info"

    const list = document.createElement("dl")
    list.append(
        createDetailRow("Email", member.email, "email.png", `mailto:${member.email}`),
        createDetailRow("Phone", member.phone, "phone-call.png", `tel:${member.phone}`),
        createDetailRow("Website", member.website, "web.png", member.websiteUrl),
        createDetailRow("Industry", member.industry, "industry-icon.png")
    )

    info.append(list)
    details.append(image, info)
    card.append(summary, details)

    return card
}

const loadMembers = async () => {
    if (!directoryList) return

    try {
        const response = await fetch("data/members.json")
        if (!response.ok) {
            throw new Error(`Member data request failed with status ${response.status}.`)
        }

        const members = await response.json()
        if (!Array.isArray(members)) {
            throw new TypeError("Member data must be a JSON array.")
        }

        const cards = members.map(createMemberCard)
        directoryList.replaceChildren(...cards)
        directoryList.setAttribute("aria-busy", "false")

        const setLayout = (view) => {
            directoryList.dataset.view = view

            layoutButtons.forEach((button) => {
                const isSelected = button.dataset.view === view
                button.classList.toggle("active", isSelected)
                button.setAttribute("aria-pressed", isSelected)
            })

            cards.forEach((card) => {
                card.open = view === "grid"
            })
        }

        const initialView = window.matchMedia("(min-width: 768px)").matches ? "grid" : "list"
        setLayout(initialView)

        layoutButtons.forEach((button) => {
            button.addEventListener("click", () => {
                setLayout(button.dataset.view)
            })
        })

    } catch (error) {
        const message = document.createElement("p")
        message.setAttribute("role", "alert")
        message.textContent = "The member directory could not be loaded. Please try again later."
        directoryList.replaceChildren(message)
        directoryList.setAttribute("aria-busy", "false")
        console.error("Could not load the member directory.", error)
    }
}

loadMembers()
