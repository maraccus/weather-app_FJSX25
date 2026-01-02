[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Väderapplikationen "Vädret nu"

En modern och responsiv väderapp byggd i ren HTML, CSS och JavaScript. Appen hämtar realtidsväder från Open-Meteo API och låter användaren söka och växla mellan flera städer med snygg pagination. Projektet är skapat som ett slutprojekt inom Fullstack- samt Frontend-utbildningen på Chas Academy för att demonstrera kursens lärandemål i praktiken.

## Förhandsvisning

![Hemskärm](/assets/readmeImages/weatherApp.webp)
![Mobilvy](/assets/readmeImages/weatherApp_mobile.webp)

## Funktioner

Projektet demonstrerar uppnåendet av kursens lärandemål genom följande funktioner, med koppling till relevanta kunskaper och färdigheter:

- **Sökning efter väder för valfri stad/plats**: Interaktiv sökning via formulär med API-integration.
- **Visning av aktuellt väder (temperatur, väderbeskrivning)**: Dynamisk rendering med modulära komponenter.
- **Responsiv design – fungerar bra på både desktop och mobil**: Anpassad layout för olika enheter.
- **Tillgänglighetsanpassningar enligt WCAG**: ARIA och kontrast för inkludering.
- **Prestandaoptimering och säkerhet**: Kodanalys och input-validering.
- **Automatiserade tester**: Enhetstester med Jest.
- **Agil arbetsmetodik**: Planering med Kanban och sprintar.
- **Dokumentation**: JSDoc för funktioner och komponenter.

Genom dessa har vi uppnått alla kursens lärandemål på en tillfredsställande nivå.

## Teknologier

- **Frontend**: HTML, CSS, JavaScript.
- **API**: Open-Meteo API.
- **Verktyg**: Git, GitHub.

## Installation och körning

Följ stegen nedan för att köra projektet lokalt:

1. Klona repot:

   ```bash
   git clone https://github.com/maraccus/weather-app_FJSX25
   ```

2. Gå in i projektmappen:

   ```bash
   cd weather-app_FJSX25
   ```

3. Installera beroenden:

   ```bash
   npm install
   ```

4. Öppna filen `index.html` i webbläsaren eller starta en lokal server (t.ex. med VS Code Live Server-extension).

5. Öppna http://localhost:3000 (eller den port som visas) i webbläsaren.

## API-information

Vi använder det öppna och kostnadsfria [Open-Meteo API](https://open-meteo.com/) för både geocoding (stad → koordinater) och aktuell väderdata. Ingen API-nyckel krävs, och tjänsten är stabil och alltid tillgänglig.

**Bakgrund till val av API**  
Projektet inleddes i samarbete med Systemutvecklarnas klass, där vi initialt använde deras custom-byggda API (endpoints: `/GetCities`, `/GetWeather`, `/GetSurprise`). Detta gav värdefull erfarenhet av samarbete mellan klasser och integration med en intern server. På grund av återkommande stabilitetsproblem (servern var periodvis nere) valde vi att byta till Open-Meteo som primär källa. Detta beslut ökade appens tillförlitlighet och tillgänglighet utan att kompromissa med funktionalitet. Koden är strukturerad så att ett byte tillbaka skulle vara möjligt vid behov.

## Team

- Pontus Ingenius – [Backend/API-integration]
- Marcus Johansson – [Frontend/Design]
- Tomac Jansson – [Jest, dokumentation, Kanban, WCAG]

## Licens

Detta projekt är licensierat under MIT License – se [LICENSE](LICENSE) för mer information.
