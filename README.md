# PreK Growth Journey · Think Academy Concept

An interactive, English-first preschool assessment prototype with a Chinese report toggle. Designed around **in-person campus visits**, combining group observations and individual assessment into actionable family reports.

**GitHub Pages:** https://pollypolly0317-star.github.io/think-academy-prek-evaluation/

**Existing hosted demo:** https://think-academy-prek-growth-polly.navy-swift-8284.chatgpt.site

## Experience

1. Parents attend a campus seminar while 1–2 teachers observe children in a group activity.
2. One teacher accompanies three children to the assessment room. Each child completes 11 tasks individually; records remain separate.
3. Teachers review evidence from both settings, record class participation support and confirm the family report.
4. Families explore strengths, priorities, observation evidence, home activities and relevant in-person learning support.

### Views

- **Parent report:** English-first / Chinese switching, evidence details, whole-child observations, teacher class-support recommendations, weekly activities and print/PDF entry.
- **Teacher workspace:** three-child record switching; group → individual → review workflow; task-specific rubric references, free notes, language context and teacher-controlled confirmation.
- **Little explorer:** a guided activity with encouraging feedback.
- **How it works:** the operating flow and how structured input, automatic saving and report reuse can reduce repeated documentation.

## Run locally

Requires Node.js 22 and npm.

```bash
npm ci
npm run dev
```

```bash
npm test
npm run build
npm run preview
```

Static output is `dist/client`. The build also retains a portable Sites worker wrapper. No hosted Site identity or credentials are included.

## Deployment

GitHub Actions tests, builds and deploys the `main` branch to GitHub Pages. `BASE_PATH` supplies the repository path; image assets use Vite's base URL so they work on both a project URL and a root domain.

## Scope

- All displayed student records are fictional demonstration data.
- Draft generation uses deterministic local rules, **not a live AI model**.
- Edits are saved in each visitor's browser (`localStorage`); there is no shared student database, authentication, staff synchronization or actual enrollment.
- Teacher review remains required. Language access and concept understanding are recorded separately. The prototype does not provide diagnoses, standardized rankings or official assessment certification.
- The interface includes supplied and generated visual assets. Brand names and source assessment materials remain with their respective owners; this repository does not grant a separate license to those materials.

## Structure

- `src/App.jsx`: application state and review workflow
- `src/SessionFlow.jsx`: group observations, child switching and class-support recommendations
- `src/ParentReport.jsx`: bilingual family report
- `src/TeacherObservations.jsx`: task rubric and contextual observation inputs
- `src/report.js`: draft-generation rules and sample tasks
- `tests/`: report logic and static-hosting tests
