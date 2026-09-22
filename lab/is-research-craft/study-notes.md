---
published: false
---

# IS Research Craft

_Study Notes_

_Reader edition 3_


# Preface: How this book develops a researcher

This book begins with a simple difficulty: a technology can work as designed while the activity around it fails. A record is saved, but nobody acts on it. A recommendation is accurate, but a worker has reasons to disregard it. Information Systems (IS) research investigates such relationships among information, digital technologies, people, and organized activity. The field contains several intellectual traditions; the working explanations in this book introduce their questions without treating one approach as the definition of the entire discipline.

IS

The six volumes follow a chain of reasoning. First define what is being studied. Then identify something worth learning, locate the relevant conversation, and formulate a question. Next decide what evidence could answer it and how to obtain that evidence. Examine what the evidence actually supports, communicate the resulting argument, and learn to manage this process independently. These stages interact: a measurement problem can force a new question, and writing can reveal a missing explanation. The sequence is a learning path, not a requirement to complete research in a single pass.

Each chapter starts with a reason for reading it, develops concepts, and ends with an application, a reviewer question, and practice. Read the concept before the application; then return from the particular example to the general principle. English and Chinese paragraphs are paired throughout. The chapter numbers remain stable so that the research-design and writing discussions can refer back to the same conceptual foundation.

This is a revised book manuscript, not a completed reference textbook. The conceptual explanations and fictional cases are instructional synthesis. The reading section identifies source-linked publications, but does not claim that every article has received a full methodological dissection. Reading, practice, feedback, and research experience must work together; completing the book alone cannot guarantee publication or independent expertise.


## The purpose and status of examples

All unreferenced scenarios, organizations, conversations, numerical illustrations, and student situations in the teaching text are hypothetical unless explicitly identified as a published study or a sourced factual account. They help isolate a reasoning problem; they do not establish how common a phenomenon is or what effects a technology has in the real world. A statement about an imagined clinic is therefore an example to reason about, not evidence about healthcare. Published papers are introduced separately in the reading section.

A useful example has four parts: a situation, a question, an analysis, and a lesson that can transfer to another setting. Actors appear because their actions or responsibilities matter to that question. When the text introduces a patient, a vendor, or a family caregiver, it should first tell you what system they belong to and why their inclusion changes the analysis. If removing an actor leaves the explanation unchanged, the actor probably does not need to be in that example.


## Case H: A clinic coordination system

Our opening case is an invented outpatient clinic, used only to teach systems thinking. Patients submit home measurements through an application. Nurses review incoming records, clinicians decide what action is appropriate, and a software vendor maintains the application and its interfaces. A family caregiver helps some patients submit readings or respond to messages. The application records submissions; the clinic has separate arrangements for assigning work and acknowledging that somebody has handled a message. No clinical recommendation or real performance finding is implied.

Each actor has a specific teaching function. The patient connects a recorded value to the person and occasion it describes. The nurse and clinician reveal the difference between receiving information and taking responsibility for action. The vendor makes an external technical dependency visible. The caregiver reveals that the person entering data may differ from the person represented by the data. Chapter 1 uses these distinctions to explain information, system boundaries, tasks, and consequences. None of these roles is required in every IS study.

1IS


## Four recurring cases for later volumes

**Case A — Online community governance.** Imagine a question-and-answer platform that changes how contributions are displayed. Members ask, answer, moderate, and leave. We use this setting to examine participation, historical data, comparison groups, unequal exposure, and the difference between platform records and the behavior those records represent. Any counts or effects supplied in exercises are teaching quantities, not findings from a live platform.

**A**

**Case B — Human–AI decisions.** Imagine employees receiving AI-generated advice while retaining responsibility for decisions. The employee, task, advice quality, interface, and ability to override the advice are distinct elements. We use this case to separate trust from reliance, labels from performance, and experimental manipulation from the mechanism a researcher hopes to establish.

**B**AI

**Case C — Organizational monitoring.** Imagine a company introducing a dashboard that makes work visible to managers. Employees and managers may interpret it differently, and those interpretations may change. This case supports learning about routines, authority, interviews, observation, conflicting accounts, and processes over time. The story does not assume that monitoring necessarily helps or harms workers.

**C**

**Case D — Designing a decision aid.** Imagine a research team building a tool that presents recommendations together with explanations and uncertainty. The case follows needs, requirements, design alternatives, evaluation, and revision. It asks what knowledge can extend beyond a single working prototype. It is related to Case B, but its primary question concerns how to design and evaluate an artifact rather than only how people react to an existing one.

**D**B


## Reading route

Read Volume 1 to acquire the vocabulary and distinctions used throughout the book. Volume 2 turns a phenomenon into a defensible question and proposal. Volume 3 explains design choices; its different methodological routes should be selected by the question rather than treated as a competition. Volume 4 examines data and evidence. Volume 5 builds an argument for readers and reviewers. Volume 6 develops the habits and decisions needed to sustain an independent research agenda. The workshops and reading atlas after the six volumes are companions to this sequence.

123456


# Volume 1: Entering the discipline

We begin with the object of inquiry: an information system. The opening clinic case introduces records, actors, tasks, and boundaries. The next chapters move from the technology’s role to disciplinary perspectives, knowledge claims, research vocabulary, scholarly communities, contribution, and learning habits. This sequence gives you the language needed to formulate a project rather than merely name a topic.


## Chapter 01: What is an information system?


### The question this chapter answers

When somebody says that an organization has installed a new information system, it is tempting to picture an application or a computer. That picture is incomplete for many research questions. Software can store a message without determining who must read it, what the message means, or who must act. Our first task is to define the object whose behavior we want to understand. Return to the hypothetical clinic introduced in the preface: it gives us one concrete setting in which to make these distinctions before applying them elsewhere.

For this introductory chapter, an information system is an arrangement through which people and technical components collect, represent, communicate, and use information in organized activity. This is a working definition for learning, not a claim that every research tradition uses an identical definition. It includes the application, but it also directs attention to tasks, responsibilities, interpretations, and links to other arrangements when those elements matter to the question.


### 1.1 Data versus information

Data are recorded representations: numbers, text, timestamps, images, or other distinctions preserved in a form that can be used. Information concerns what those representations tell someone in a particular context. The distinction is relational. The same record can be useful to one person and uninterpretable to another; adding context can change what can reasonably be learned from it. Calling a record “data” does not mean it is meaningless, and calling it “information” does not guarantee that it is accurate.

**Example H1 — A number becomes interpretable.** Suppose the clinic application receives the value “38.” On its own, the value does not identify the measured quantity, unit, person, or time. Adding “temperature, degrees Celsius, patient P, recorded at time T” makes a different interpretation possible. A nurse can now relate the record to a task and decide whether more context is needed. This example concerns the organization of information; it does not prescribe a clinical action or threshold.

**H1**38PT

The lesson is that storing a value and supporting an informed action are different accomplishments. A researcher studying record completeness might examine whether the necessary fields are present. A researcher studying coordination would also examine whether the appropriate person receives and interprets those fields. Neither question is answered by counting database rows alone. Before choosing a measure, write down what a record represents and what additional interpretation your claim requires.


### 1.2 System boundaries

A system boundary is the analytical decision about what belongs inside the system being examined and what is treated as part of its environment. It is not necessarily the edge of an application, building, organization, or dataset. Boundaries should follow the question. A narrow boundary can make a study feasible, but it can also hide dependencies needed to explain the outcome. An unlimited boundary creates the opposite problem: the analysis becomes impossible to organize.

**Example H2 — Why include the vendor?** If our question is whether a record can be saved in the application, the immediate software workflow may be sufficient. If our question is why messages sometimes fail to reach staff, the vendor’s interface maintenance may become relevant. The vendor is introduced because an externally controlled technical dependency might influence the process, not because every information-system study must investigate suppliers. Inclusion creates a task: identify the relevant interface, responsibility, or event rather than merely adding “vendor” to a diagram.

**H2**

**Example H3 — Why include the caregiver?** Suppose some patients’ readings are submitted by relatives. If the question concerns the patient’s independent use of the application, counting these submissions as patient use would confuse two actors. If the question concerns how readings enter the clinic’s workflow, caregiver assistance is part of the process. The caregiver helps us see that the subject of a record, the person operating an interface, and the person responsible for a task can be different people.

**H3**

For your own study, draw two plausible boundaries and compare the explanations they permit. A useful justification takes this form: “We include X because it participates in process Y, which is necessary to understand outcome Z; we exclude W because our claim does not extend to that process.” Exclusion remains a limitation when the omitted dependency might alter the interpretation. A defensible boundary is explicit and revisable, not simply whatever happens to be in the available data.

XYZW


### 1.3 Actors and tasks

An actor is an entity whose actions are relevant to the analysis; in this chapter, begin with people and organized groups. Some theories also analyze technical components as actors, but that usage needs its own justification. A task is an activity directed toward an outcome. The important questions are who performs it, who is authorized to perform it, what resources are needed, and how completion becomes visible to others. Do not assume that everyone called a “user” has the same goal.

**Example H4 — Receiving is not resolving.** In the clinic case, the patient submits a reading, the application delivers it, a nurse reviews it, and a clinician may decide on follow-up. These are separate tasks. A delivery timestamp establishes one event, not the completion of the whole sequence. If nobody is responsible for the next step, technically successful delivery can coexist with an unresolved message. A task map therefore needs handoffs and responsibility, not just a list of people.

**H4**

A practical mapping exercise uses one row for each task and records its input, performer, decision authority, output, and next recipient. Mark any handoff that is assumed rather than observed. This turns a vague claim such as “the system improved coordination” into questions that can be investigated: which handoff changed, whose work changed, and what evidence would show that coordination improved?


### 1.4 Technical and social arrangements

Technical arrangements include interfaces, access permissions, storage, routing rules, and the operations the technology supports. Social arrangements include responsibilities, expectations, incentives, staffing, and shared interpretations. Separating the two analytically helps us ask questions, but in practice they often shape each other. A permission setting may embody a rule about authority; a workaround may emerge because the official routing rule conflicts with actual work.

**Example H5 — The same application, two workflows.** Imagine that Clinic North assigns one nurse per shift to review incoming messages and records each handoff. Clinic South uses the same application but expects whoever is free to notice the shared inbox. This is a hypothetical contrast, not an observed performance comparison. It shows why identical software does not establish identical information systems. To explain different outcomes, we would need evidence about workload, staffing, message composition, responsibilities, and other relevant differences.

**H5**

The example gives us a possible explanation to investigate; it does not establish a causal effect of assigning a nurse. That distinction will recur throughout the book. A compelling story can guide data collection and sharpen a question, but evidence and design determine how strongly the resulting claim can be made. Even at the introductory stage, keep “could explain” separate from “has been shown to explain.”


### 1.5 Intended and unintended outcomes

An intended outcome is a result that the intervention is meant to produce. An unintended outcome lies outside those aims; it may be beneficial, harmful, or mixed. Neither category tells us whether the outcome actually occurred. To evaluate a system, specify whose outcome matters, the time period, the relevant alternative, and how a change would be recognized. Organizational efficiency and an individual’s workload are related but not interchangeable outcomes.

**Example H6 — A benefit may move work elsewhere.** Suppose the clinic intends to reduce staff time spent entering readings. Patients or caregivers may instead spend additional time submitting or correcting them. That possibility does not prove the system is undesirable; it shows why a measure of staff time alone cannot establish total effort saved. Conversely, an unplanned improvement in communication could be beneficial. A balanced evaluation tracks plausible gains and burdens instead of classifying every unintended consequence as a failure.

**H6**


### Worked synthesis: Defining the object before evaluating it

Consider the draft question, “Does the application work?” It could mean at least three things: does the software transmit records, does the clinic complete the intended coordination process, or do patients and staff experience better outcomes? These require different boundaries and evidence. A more explicit introductory question is, “How are submitted readings handed from the application to an accountable staff member in the two clinic workflows?” It identifies a process and makes the relevant actors visible without claiming an effect before evidence is collected.


### Reviewer question and substantive repair

**Fictional reviewer question:** “You attribute the outcome to the system, but what exactly counts as the system?” A weak repair merely adds the phrase “sociotechnical system.” A substantive repair describes the application, actors, task sequence, boundary, and outcome, then aligns the evidence with that definition. The lesson is not to use a more impressive label. It is to let a reader identify what has been studied and what the claim excludes.


### Practice and explained feedback

Draw the clinic system for two questions: whether a record is transmitted successfully, and whether a message reaches somebody who takes responsibility for it. Include one actor outside each boundary and explain the exclusion. Then identify one observable record and one conclusion that cannot be drawn from that record alone. Finally, transfer the exercise to an online course, marketplace, or workplace application of your choice.

A defensible answer might use the application and relevant interfaces for the transmission question, while adding staff roles and handoffs for the responsibility question. A delivery timestamp supports a claim about delivery, not necessarily review or action. The caregiver belongs inside the analysis when authorship of a submission or assistance is relevant; the vendor belongs inside when its actions or interfaces are needed to explain the process. Different boundaries can be defensible if their corresponding claims remain consistent. An unexplained list of every imaginable actor is not a stronger answer.


### What comes next

You can now distinguish an application from the wider arrangement through which information becomes useful. Chapter 2 asks a more focused question: what role does the technology itself play in a research argument? That step prevents the opposite mistake—describing people and organizations so generally that the particular technology disappears from the explanation.

2


## Chapter 02: Technology and the IS research object

Chapter 1 defined the wider system. We now distinguish the technology’s properties from its role in the research. An application can be the object being explained, a change whose consequences are studied, or a tool used to collect evidence. Confusing these roles makes both the question and its evaluation unclear.

1


### Learning objective

Identify the role technology plays in a research argument.


### Opening example 02 (hypothetical): AI adoption or AI-assisted coding?

A fictional company offers employees an AI writing assistant. Team One studies how employees decide whether to use its suggestions. Team Two interviews employees about workplace coordination and uses an AI model to assign preliminary codes to the transcripts. Both teams use AI, but they are not studying the same object.

AIAIAI


### 2.1 IT artifacts

An IT artifact is a deliberately constructed technical object or arrangement being studied. Specify its functions, interfaces, configuration, and version where consequential. Calling a heterogeneous collection of applications simply AI obscures the actual intervention.

ITAI


### 2.2 Digital features

A feature is an identifiable capability or configuration, not automatically a mechanism. Visibility, persistence, and recommendation ranking may affect behavior through different paths. Explain the action a feature enables before predicting its consequence.


### 2.3 Use practices

Use practices are recurrent ways people incorporate technology into activity, including workarounds. Distinguish formal usage policies from observed practices. A login is evidence of access, not proof of meaningful appropriation or task completion.


### 2.4 Affordances and constraints

An affordance concerns an action possibility in relation to an actor and context; a constraint limits possibilities. A dashboard can enable oversight for managers yet constrain workers. Separate available possibilities from actions actually taken.


### 2.5 Technology as object, context, intervention, or instrument

Studying technology’s consequences, using technology to measure something else, and designing technology generate different validity questions. An LLM used to label texts requires measurement validation even when the substantive paper is not about AI behavior.

AILLM


### Returning to the example: reasoning and lesson

For Team One, the assistant and employees’ responses are part of the substantive question. For Team Two, the coding model is a measurement aid whose output must be checked against the analytic purpose. Better coding accuracy would not answer Team One’s adoption question. The transferable lesson is to identify technology’s role before deciding what counts as validation.


### Reviewer lens

Would the argument change if the technology changed? Explain why or why not.


### Exercise and deliverable

Write a technology-role memo with two alternative framings.


## Chapter 03: IS and its neighboring disciplines

Once the technology and system are specified, the same setting can still support different questions. This chapter explains how neighboring disciplines direct attention to different puzzles. The goal is to choose an intellectual conversation and contribute to it while recognizing useful connections to other traditions.


### Learning objective

Explain alternative disciplinary framings without treating boundaries as rigid.


### Opening example 03 (hypothetical): One recommender, several questions

Imagine a retail website that ranks products for customers. Its engineers can change the ranking algorithm, customers can ignore recommendations, and sellers can change prices. No performance result is assumed. We want to see how different questions make different parts of the same setting analytically important.


### 3.1 Computer science

Computing research can ask whether an algorithm is correct, efficient, or accurate. An IS question may additionally examine how its deployment changes decisions or organizing. Neither framing is superior; justify the knowledge the study seeks.

IS


### 3.2 Economics

An economic framing may emphasize incentives, strategic interaction, allocation, and welfare. Distinguish a behavioral association from an equilibrium prediction and from a welfare claim. These require different assumptions and evidence.


### 3.3 Psychology

A psychological framing examines cognition, emotion, motivation, and individual differences. Specify whether a study measures internal states or infers them from behavior. Identical clicks can arise from different beliefs or feelings.


### 3.4 Organization studies

Organizational research studies coordination, routines, authority, identity, and change. A technology intervention can reorganize dependencies rather than simply improve individual efficiency. Identify the collective process connecting individual action to organizational outcomes.


### 3.5 Strategy and sociology

Strategic questions concern durable advantage and positioning; sociological questions may concern networks, institutions, inequality, and power. Make the relevant social structure explicit rather than treating organizational context as a list of control variables.


### 3.6 Interdisciplinary translation

Translating between disciplines requires preserving the original concept’s assumptions while adapting the question. Explain where meanings differ: efficiency, value, agency, and trust are not interchangeable across traditions without clarification.


### Returning to the example: reasoning and lesson

An engineering question might concern prediction error; an economic question might concern seller incentives; a behavioral question might concern how customers interpret recommendations. An IS question could examine how ranking visibility changes seller practices and customer decisions. These are overlapping possibilities, not rigid disciplinary ownership. Choose the knowledge sought, then the appropriate unit and evidence.

IS


### Reviewer lens

What does this framing add to the conversation it addresses?


### Exercise and deliverable

Produce a comparison matrix of questions, units, and evidence.


## Chapter 04: Research traditions and knowledge claims

Choosing a conversation also raises a deeper question: what would count as knowing something about the setting? This chapter introduces assumptions about reality, evidence, and interpretation. These assumptions matter because a design must justify its claims in terms appropriate to the kind of knowledge it seeks.


### Learning objective

Recognize multiple legitimate routes to knowledge.


### Opening example 04 (hypothetical): Understanding a workplace dashboard

In a fictional company, a new dashboard displays workers’ task completion to supervisors. A researcher wants to know whether use changes over time; another wants to understand why employees describe the dashboard as either helpful or intrusive. Both can investigate the same deployment without asking identical questions.


### 4.1 Ontology

Ontology asks what kinds of entities and relations the study assumes exist. Treating culture as a measurable organizational attribute differs from studying how members enact culture. This choice affects observation and explanation, not only terminology.


### 4.2 Epistemology

Epistemology concerns how claims can be warranted and the researcher’s relation to what is known. Ask what would count as convincing evidence under the chosen approach and why another approach might evaluate it differently.


### 4.3 Positivist, interpretive, and critical orientations

Positivist, interpretive, and critical orientations differ in aims and assumptions, with substantial variation within each. Testing associations, understanding situated meaning, and examining domination require different arguments; none can be reduced to a preferred software package.


### 4.4 Pragmatism

Pragmatism directs attention to inquiry and its consequences, but does not mean any convenient method is acceptable. Justify how methods address the question, what evidence each supplies, and how contradictory findings will be handled.


### 4.5 Explanation and understanding

Explaining a regularity and understanding participants’ meanings can be complementary but are not identical tasks. Describe whether the argument concerns causes, reasons, temporal processes, or meaning; avoid sliding among them without justification.


### 4.6 Reflexivity

Reflexivity examines how position, access, assumptions, and interaction shape inquiry. Keep memos about consequential decisions and changes in interpretation. A generic declaration of possible bias is weaker than showing how a particular influence was examined.


### Returning to the example: reasoning and lesson

A study of usage relationships must justify measures and comparisons. An interpretive study must show how accounts, observations, and context support its understanding of meaning. A critical inquiry might examine whose interests the dashboard serves and whose work becomes invisible. Method names alone do not establish coherence; the question, assumptions, and evidential argument must fit together.


### Reviewer lens

Are the research question, assumptions, and evaluation criteria coherent?


### Exercise and deliverable

Explain two coherent designs for one phenomenon.


## Chapter 05: The language of research

The preceding chapters used words such as question, evidence, and explanation. We now separate these terms carefully. This vocabulary lets you trace an argument from a phenomenon through a concept and a measure to a conclusion, and notice when a writer silently substitutes one for another.


### Learning objective

Distinguish foundational terms before using advanced methods.


### Opening example 05 (hypothetical): A click is not a definition of trust

Imagine employees receiving recommendations from a workplace assistant. The application records whether each recommendation is accepted. The researcher proposes studying trust, but has not yet defined what trust means in this setting. Some employees may accept advice because it is convenient or because alternatives are unavailable.


### 5.1 Phenomenon

A phenomenon is something occurring that deserves description or explanation, not necessarily a problem for an organization. Establish its form and context before inferring causes; an anecdote can motivate inquiry without establishing prevalence.


### 5.2 Question

A research question specifies what the study seeks to learn. It should admit an informative answer and expose uncertainty. A sentence ending in a question mark may still conceal a predetermined conclusion.


### 5.3 Concept and construct

A concept names an idea; a construct is an explicitly specified conceptual object used in a research argument. Usage varies by tradition. Define its domain, exclusions, and role instead of relying on the everyday meaning of its name.


### 5.4 Variable and indicator

A variable varies across units or occasions; an indicator is used to represent something, often a construct. The observed indicator may be imperfect. A numerical column does not become a valid measure merely because it is available.


### 5.5 Hypothesis and proposition

Hypotheses typically state empirically assessable expectations; propositions may express conceptual relationships at a different level of abstraction. Define their use locally. Some interpretive or exploratory studies appropriately proceed without prespecified directional hypotheses.


### 5.6 Evidence and inference

Evidence is material bearing on a claim; inference is the reasoning connecting them. One result can support several explanations. State the inferential bridge and the additional assumptions instead of presenting a coefficient as self-interpreting proof.


### Returning to the example: reasoning and lesson

For this exercise only, define trust as an expectation that the assistant will perform reliably in the relevant task. Acceptance is an observed action, not that expectation itself. A survey response would also be an indicator requiring justification. The reasoning chain is definition, proposed indicator, observation, and inference; moving between these steps requires an argument, not a shared label.


### Reviewer lens

Does the wording confuse what is observed with what is inferred?


### Exercise and deliverable

Build a concept-to-evidence diagram and diagnose five category errors.


## Chapter 06: Academic communities and publication

Research becomes part of collective knowledge through communication and criticism. Having learned the basic vocabulary, we now examine who reads, assesses, and develops a research argument. Understanding this process helps you seek useful feedback without treating publication decisions as a substitute for intellectual judgment.


### Learning objective

Understand how research is communicated and assessed.


### Opening example 06 (hypothetical): From workshop feedback to revision

A fictional doctoral student presents a study of employee use of a collaboration application. Workshop participants ask what the usage records represent. Later, hypothetical journal reviewers ask a similar question. No actual journal decision or policy is being described.


### 6.1 Articles and proceedings

An article is a scholarly communication; proceedings collect conference contributions. Publication formats differ in length, review, and purpose. Read the specific contribution and policy rather than assuming all outputs with the same label have equivalent status.


### 6.2 Conferences and journals

Conferences enable presentation and dialogue as well as publication; journals have varied article types and revision practices. Explain their roles in a research trajectory and verify duplicate-publication rules before extending conference work.


### 6.3 Editors and reviewers

Reviewers advise through substantive assessment; editors integrate assessments and make or coordinate decisions. A response must address the manuscript’s problem, not merely persuade one reviewer. Decision authority and review stages depend on the venue.


### 6.4 Revision cycles

Revision is a sequence of learning and redesign, not just polishing. Separate requests that need clarification, new analysis, new data, or a changed claim. Record when a proposed repair cannot be made honestly with available evidence.


### 6.5 Research communities

A research community is organized around continuing questions, practices, and conversations. Learn its disagreements and vocabulary by reading connected papers. Belonging does not require accepting every prevailing assumption or restricting attention to one journal.


### 6.6 Venue fit

Fit concerns whether a venue’s audience and remit suit the contribution. Prestige alone cannot establish fit. Read actual article types and current guidance, then explain the intellectual audience rather than tailoring claims to imagined editorial preferences.


### Returning to the example: reasoning and lesson

The recurring criticism points to a measurement problem, not simply an audience that needs more persuasion. A substantive revision defines meaningful use, checks what the records capture, and narrows any unsupported conclusion. Workshops and reviews can both expose weaknesses, while editorial decisions involve additional considerations. The lesson is to follow the intellectual problem across communication settings.


### Reviewer lens

Which audience needs this contribution, and why?


### Exercise and deliverable

Create an audience map; verify venue policies before operational use.


## Chapter 07: What makes a contribution?

Understanding publication does not yet explain why a study deserves attention. This chapter asks what changes in knowledge because of a study. Separate being new, being important, and being credible: a defensible contribution needs an articulated change and evidence appropriate to that change.


### Learning objective

Separate novelty, importance, credibility, and usefulness.


### Opening example 07 (hypothetical): A new setting or a changed explanation?

Suppose a fictional prior study argues that public recognition encourages contributions to a digital community. A student proposes studying another country. Another student proposes comparing settings where recognition affects employment prospects with settings where it does not. These are proposed studies, not established findings.


### 7.1 Theoretical contribution

A theoretical contribution changes an explanation, concept, relationship, process, or boundary in a justified way. Name the prior understanding and the change. Adding a variable without showing why it changes understanding may be a weak extension.


### 7.2 Empirical discovery

An empirical discovery establishes a consequential pattern or phenomenon with credible evidence. It can matter before a complete explanation is available. Distinguish discovery from novelty created by unreliable measurement or selective presentation.


### 7.3 Methodological contribution

A methodological contribution improves how a class of research problems can be studied. Demonstrate the problem with existing approaches, the proposed improvement, and its limits. Applying a familiar method to a new dataset is not automatically a method contribution.


### 7.4 Design knowledge

Design knowledge explains how or why a class of artifacts can address a class of problems under specified conditions. A useful prototype is a starting point; articulate which principles or validated insights extend beyond that implementation.


### 7.5 Replication

Replication reassesses a claim using specified degrees of procedural and contextual similarity. Define what is reproduced and what changes. Both convergence and divergence can be informative when design and measurement differences are transparently examined.


### 7.6 Contextual boundaries

Context becomes theoretically consequential when it changes a process, assumption, or relationship. A new country or industry is not itself a mechanism. Explain the relevant institutional, technical, or behavioral difference and assess it directly where possible.


### Returning to the example: reasoning and lesson

A new-country replication may test how well a claim travels and can be useful. The second proposal additionally identifies a possible boundary involving the consequences of recognition. It becomes a stronger boundary argument only if those consequences are specified and examined rather than assumed from country labels. Contribution depends on what is learned, not the novelty of the location alone.


### Reviewer lens

What can readers understand or do after the study that they could not before?


### Exercise and deliverable

Write contribution claims at three strengths and match required evidence.


## Chapter 08: Learning to become a researcher

Volume 1 ends by turning its distinctions into a learning routine. You do not need to master every method before asking a careful question. You do need to recognize uncertainty, explain decisions, and use feedback to improve them. Those habits prepare you to develop a project in Volume 2.

12


### Learning objective

Build an initial research routine and identify foundational gaps.


### Opening example 08 (hypothetical): Reading without a developing question

A fictional first-year student has read twenty papers about digital platforms. Their notes record titles and conclusions but not questions, comparisons, or disagreements. Asked to propose a project, the student says that platforms are important and more research is needed. The count is merely a teaching detail.


### 8.1 Reading habits

Read with a question and leave a retrievable record of the argument, design, and your uncertainties. Alternate broad mapping with close reading. Counting papers read is less informative than demonstrating how reading changed a research decision.


### 8.2 Uncertainty

Research uncertainty can concern facts, concepts, methods, or feasibility. Name the uncertainty and choose an action that reduces it. Do not replace unresolved questions with confident language simply to make a project appear mature.


### 8.3 Feedback

Useful feedback identifies a consequential gap and suggests how to investigate it. Ask clarifying questions and distinguish disagreement from misunderstanding. Maintain a response record showing which advice was adopted, declined, or deferred and why.


### 8.4 Quantitative literacy

Quantitative literacy begins with denominators, units, distributions, comparisons, and uncertainty. Before advanced models, explain what a rate or average means. A large dataset does not repair a mismatched unit of analysis.


### 8.5 Writing practice

Writing externalizes reasoning and reveals missing links. Use short problem statements and explanation memos early, before a full paper exists. Revise the argument itself when writing exposes a contradiction rather than only improving sentence fluency.


### 8.6 Progress versus activity

Activity records what was done; progress records what became clearer or feasible. Ten failed runs may represent progress if they eliminate a plausible explanation. Report decisions and learning, including evidence that a direction should stop.


### Returning to the example: reasoning and lesson

The next useful step is to reconstruct a small set of arguments: what each study asks, what its evidence establishes, and where their claims diverge. A one-page puzzle can then identify a specific unresolved issue. More reading may be necessary, but it should reduce a named uncertainty. Progress is the improvement in judgment, not the accumulation of titles.


### Reviewer lens

Can the student explain decisions and revise them when evidence changes?


### Exercise and deliverable

Prepare a learning plan and a one-page phenomenon note.


# Volume 2: Questions, literature, and theory

This volume turns an observation into a proposal. Follow the chain from phenomenon to question, search, synthesis, problem, constructs, explanation, and feasibility. Case B supplies a recurring setting: workers encounter AI advice, but access, reliance, and good decisions are different things. The other clearly labeled examples test whether the reasoning transfers beyond that setting.

BAI


## Chapter 09: Observing phenomena and finding puzzles

The foundation now becomes a project. Begin by observing what happens before deciding why it happens. This chapter separates a reported event, an established pattern, and a puzzle; confusing them can make the rest of a project depend on a phenomenon that has never been demonstrated.


### Learning objective

Turn observations into candidate puzzles without prematurely asserting causes.


### Opening example 09 (hypothetical): Adoption with little reliance

Imagine a company where employees log into an AI assistant but frequently complete tasks without accepting its suggestions. Login and acceptance events are recorded separately. A manager calls this resistance; a researcher has access to a small sample of logs and interviews but has not established how widespread the pattern is.

AI


### 9.1 Observation sources

Observation sources differ in what they reveal and omit. Interviews reveal accounts, logs record selected events, and industry reports reflect collection incentives. Triangulate when useful, but do not count several derivative reports as independent corroboration.


### 9.2 Surprises

A surprise is meaningful relative to an expectation. State what you expected and why before interpreting a surprising pattern as a puzzle. Check whether data errors or unfamiliarity, rather than theoretical tension, explain the surprise.


### 9.3 Contradictory behavior

Apparently contradictory behavior may reflect different constraints, time horizons, or audiences. A worker can welcome assistance while resisting monitoring. Ask whether a contradiction lies in participants’ actions or in the researcher’s overly simple categories.


### 9.4 Stakeholder perspectives

Different stakeholders may define the same outcome differently. A platform’s engagement gain may be a worker’s loss of autonomy. Map whose interests, knowledge, and authority shape the phenomenon before declaring a single performance objective.


### 9.5 Alternative accounts

Generate several explanations before committing to a favorite. For reduced posting after AI adoption, consider substitution, composition, moderation changes, and measurement. This is a diagnostic exercise; the list alone does not establish that any explanation is true.

AI


### 9.6 Scope

Scope specifies the actors, activity, setting, and period that the puzzle covers. Narrowing scope can improve explanatory precision. State which broader claims the study will deliberately leave unanswered rather than implying universal relevance.


### Returning to the example: reasoning and lesson

First describe what the records show and whom they cover. Then consider whether employees reject poor advice, consult without copying, or face tasks the tool cannot support. The puzzle is the relationship between access and reliance; resistance is one possible explanation. The lesson is to establish a phenomenon before treating one interpretation as its cause.


### Reviewer lens

Is the puzzle documented or merely asserted?


### Exercise and deliverable

Produce a puzzle memo with evidence, uncertainty, and three explanations.


## Chapter 10: Formulating research questions

A puzzle becomes researchable when we state what we need to learn. Building on Chapter 9, specify the process, population, and uncertainty without writing the preferred answer into the question. The wording will later guide the design, so every major term must have a defensible meaning.

9


### Learning objective

Move from a topic to an answerable and worthwhile question.


### Opening example 10 (hypothetical): Repairing a broad AI question

A fictional researcher asks, “How does AI affect work?” The available setting is a customer-support team using an assistant to draft responses. Supervisors can review drafts, and employees can edit or reject them. The broad question does not specify which change, outcome, or worker experience is at issue.

AI


### 10.1 Topic versus question

A topic names an area of interest; a question identifies an uncertainty within it. AI in education is a topic. Asking how teachers revise decisions after conflicting AI advice identifies a process that can be investigated.

AIAI


### 10.2 Descriptive and explanatory questions

Descriptive questions establish what occurs; explanatory questions ask how or why. A causal question additionally requires a defensible counterfactual argument. A descriptive contribution should not be judged deficient merely because it does not estimate a causal effect.


### 10.3 Units and time

Specify the entity about which an answer is sought and the relevant time scale. Individual adaptation over days differs from organizational transformation over years. The observation unit may differ from the theoretical unit and must be reconciled.


### 10.4 Significance

A significant research question has consequential uncertainty, not merely an opportunity for statistical significance. Explain what interpretation, decision, or body of knowledge would change under alternative answers. Ask whether a null finding would also teach something.


### 10.5 Feasibility

Feasibility includes access, measurement, identification or interpretation, expertise, time, and permissions. A readily downloadable dataset may lack the variables needed for the question. Pilot the weakest link before investing in a complete study.


### 10.6 Stopping criteria

Stopping criteria identify conditions that make a design uninformative or infeasible. They should concern evidence and resources, not failure to obtain a preferred result. Decide whether to stop, narrow the question, or collect different material.


### Returning to the example: reasoning and lesson

One descriptive question is how drafting and checking time are distributed after introduction. A causal question would ask how access changes a specified outcome relative to an appropriate alternative. A process question might ask how employees develop checking routines. These are different projects; narrowing the words must be accompanied by narrowing the knowledge sought.


### Reviewer lens

Would answering the question change a substantive understanding?


### Exercise and deliverable

Write a question tree and select one branch with explicit tradeoffs.


## Chapter 11: Searching and verifying literature

Before claiming that a question is unanswered, investigate the conversation around it. This chapter explains how a search becomes a documented inquiry rather than a collection of familiar titles. The aim is to find relevant arguments and credible records, including work that challenges your initial framing.


### Learning objective

Create a transparent and revisable search process.


### Opening example 11 (hypothetical): Searching across different vocabularies

A student studies software that assigns tasks and evaluates workers on a digital labor platform. They initially search only for “AI management.” Relevant work may describe the activity with other terms, including algorithmic control, platform work, or electronic monitoring. These are candidate terms, not a completed literature search.

AImanagement


### 11.1 Keywords and synonyms

Translate a concept into multiple scholarly and practical terms. A term’s meaning can change across disciplines and years. Record search strings and refine them after examining missed relevant papers rather than searching one fashionable label only.


### 11.2 Seed papers

Seed papers are starting points selected for relevance, synthesis, or foundational importance. Use several seeds from differing perspectives to avoid inheriting one author’s citation boundaries. A highly cited seed may omit newer dissenting work.


### 11.3 Backward and forward search

Backward searching identifies antecedents; forward searching identifies later use, extension, and criticism. Inspect the citing passage, because citation does not imply agreement. Keep track of why each newly found paper enters the review.


### 11.4 Databases

Databases differ in coverage, indexing, access, and search syntax. Use an appropriate combination for the review’s purpose. A general search engine is useful for discovery but does not make a review exhaustive or reproducible by itself.


### 11.5 Inclusion criteria

Inclusion criteria define relevance in terms of questions, settings, designs, dates, and publication types where justified. Specify exclusions transparently. Do not exclude a credible study simply because it contradicts the intended narrative.


### 11.6 Citation verification

Verify identity and support separately: a real DOI does not prove that a paper supports the sentence citing it. Check authors, year, version, and the relevant passage. Mark inaccessible claims as unverified rather than filling gaps from memory.

DOI


### Returning to the example: reasoning and lesson

Build search groups around the phenomenon, technology, and organizational process; record queries and inclusion decisions. Inspect retrieved papers before treating a term as equivalent to the focal concept. Trace relevant references and check publication records. The lesson is that a keyword is an entry point into a conversation, not proof that the conversation has been covered.


### Reviewer lens

Could relevant counterevidence have been systematically missed?


### Exercise and deliverable

Deliver a search log, screening record, and verified bibliography sample.


## Chapter 12: Reading and synthesizing research

Retrieving papers is only the beginning. We now compare what studies ask, assume, observe, and infer. A synthesis explains relationships among findings; it does not average away disagreements or arrange summaries by author. This comparison supplies the basis for identifying a meaningful problem in Chapter 13.

13


### Learning objective

Reconstruct arguments and compare studies on meaningful dimensions.


### Opening example 12 (hypothetical): Apparent disagreement about disclosure

Imagine three fictional studies: one asks whether people say they will share personal details, another records what they actually post to friends, and a third examines disclosure to an anonymous public audience. Their reported relationships point in different directions. No real articles are being summarized here.


### 12.1 Claim reconstruction

Reconstruct a paper as premises, claims, evidence, and inferential steps. First describe the argument fairly, then criticize it. Separating what the authors say from your interpretation prevents a review from attacking an argument they did not make.


### 12.2 Design reading

Read who was observed, how units entered the study, what varied, and when measurement occurred. Draw the design before reading coefficients. This often reveals whether the intended comparison is actually available in the data.


### 12.3 Results interpretation

Interpret direction, magnitude, uncertainty, scale, and population together. A coefficient’s meaning depends on coding, units, and conditioning. For qualitative findings, inspect how the reported theme or process follows from the material presented.


### 12.4 Limitation appraisal

A limitation matters when it threatens a specific inference or boundary. Distinguish unavoidable scope choices from repairable defects. Saying a sample is small is incomplete without explaining what that prevents the study from establishing.


### 12.5 Evidence matrices

An evidence matrix compares studies by constructs, question, setting, design, measures, findings, and limits. Keep interpretation separate from extracted facts. Add columns only when they help explain agreement, disagreement, or opportunities for contribution.


### 12.6 Synthesis

Synthesis explains patterns across studies rather than averaging their conclusions rhetorically. Conflicting findings may result from different populations, measures, or mechanisms. Preserve unresolved disagreements and propose what evidence could distinguish the competing accounts.


### Returning to the example: reasoning and lesson

Before calling the literature inconsistent, compare intention with behavior, the audience, the information requested, and the designs. Some disagreement may disappear because the studies estimate different things. Remaining disagreement can become a focused question. The lesson is to align concepts and comparisons before synthesizing conclusions.


### Reviewer lens

Does the synthesis explain differences or merely list papers?


### Exercise and deliverable

Produce an evidence matrix and a synthesis paragraph with disagreement preserved.


## Chapter 13: Gaps, assumptions, and problematization

A literature map reveals absences and tensions, but not every absence matters. This chapter asks which missing evidence or questionable assumption prevents understanding. State the consequence of leaving the issue unresolved before turning it into a contribution claim.


### Learning objective

Evaluate whether a gap matters and examine assumptions behind existing work.


### Opening example 13 (hypothetical): When more participation may not mean better quality

A fictional question-and-answer platform recruits new contributors. The research team considers a claim that more participation improves content quality. New contributors could add expertise, but could also increase duplicate questions and moderation work. These are competing possibilities, not assumed outcomes.


### 13.1 Missing topics

An unstudied topic is a bibliographic absence, not automatically a valuable gap. Ask whether existing knowledge already predicts the answer adequately. Show why studying the omission could change an explanation, practice, or boundary.


### 13.2 Conflicting findings

Conflicting findings are informative only after checking comparability. Two studies may use the same label for different outcomes. Reconcile definitions and designs before presenting the disagreement as a theoretical contradiction.


### 13.3 Neglected assumptions

An assumption may be explicit in a model or implicit in sampling and measurement. Identify what must hold for an argument to work, then ask whether digital change undermines that premise. Do not invent a straw-man assumption.


### 13.4 Anomalous cases

An anomalous case challenges an expected pattern under conditions where the expectation should apply. Check errors and boundary mismatches first. A well-documented exception can motivate revising a process explanation rather than discarding a theory wholesale.


### 13.5 Practical puzzles

A practical puzzle becomes scholarly when linked to a broader uncertainty that can be investigated. A firm’s poor sales may be a local problem; how algorithmic recommendations redistribute attention may support a more general question.


### 13.6 Contribution opportunities

A contribution opportunity specifies the prior claim, its unresolved weakness, the proposed learning, and the evidence needed. Evaluate multiple opportunities before selecting one. An exciting claim without a credible path to evidence remains a possibility, not a contribution.


### Returning to the example: reasoning and lesson

The useful problem is not merely that this platform has not been studied. It is whether the benefit of additional contributions depends on the platform’s ability to integrate and assess them. Specify participation and quality separately, then ask which conditions distinguish the competing paths. This identifies an assumption whose failure would change understanding.


### Reviewer lens

Why should this gap be closed?


### Exercise and deliverable

Transform a weak gap claim into two defensible problem statements.


## Chapter 14: Constructs and levels of analysis

A promising question can still fail if its concepts shift meaning or level. Return to the distinction between constructs and indicators from Chapter 5. Here we specify what each construct includes, whose property it is, and whether aggregation changes the claim.

5


### Learning objective

Define concepts and maintain consistency across levels.


### Opening example 14 (hypothetical): Individual belief and team climate

Imagine employees in several departments answering questions about an internal collaboration tool. Some questions concern each employee’s belief that colleagues will help; others concern shared expectations within the department. The researcher wants to compare departments using employee responses.


### 14.1 Conceptual domains

A construct’s conceptual domain states which properties belong to it. Include inclusion and exclusion examples before writing items or selecting proxies. Without boundaries, a broad construct can absorb every favorable outcome and become unfalsifiable.


### 14.2 Discriminant boundaries

Discriminant boundaries explain why neighboring constructs are distinct. Trust, satisfaction, reliance, and usefulness may correlate without being identical. Show a plausible case where one is high and another low to test conceptual separation.


### 14.3 Individual and collective properties

Some properties belong to individuals; others characterize relations or collectives. A team’s coordination is not simply every member’s ability. Specify the property’s bearer and explain why the chosen data represent that level.


### 14.4 Emergence

Emergence describes how interactions produce higher-level properties. Specify the process rather than assuming collective outcomes are individual means. Repeated reciprocal exchanges may create a norm that is not reducible to any one participant’s attitude.


### 14.5 Aggregation

Aggregation combines lower-level observations using a rule. Justify that rule theoretically and empirically when appropriate. A sum measures volume, a mean measures average intensity, and a concentration index measures distribution; they answer different questions.


### 14.6 Cross-level inference

Cross-level inference links evidence at one level to a claim at another. Community-level growth cannot prove each member became more active. Identify composition, contextual effects, and within-unit change before making individual or collective claims.


### Returning to the example: reasoning and lesson

A department average of individual beliefs is an aggregate, but it does not automatically demonstrate a shared climate. Explain why the construct belongs at the department level and examine whether the responses support that interpretation. Keep individual and collective claims distinct. The lesson is that changing the unit of analysis can change the meaning of the construct.


### Reviewer lens

Does the measure represent the claimed construct at the claimed level?


### Exercise and deliverable

Create a construct dictionary and diagnose an aggregation error.


## Chapter 15: Theorizing mechanisms and boundaries

Clear constructs tell us what the argument concerns; mechanisms explain how or why its relationships arise. This chapter connects actors, actions, conditions, and outcomes. Competing explanations are useful because they reveal which evidence could distinguish the proposed process from a plausible alternative.


### Learning objective

Develop a reasoned explanation and distinguish it from an observed pattern.


### Opening example 15 (hypothetical): Automation and checking work

Imagine an assistant that drafts reports for analysts. Drafting may become faster, while checking factual claims and correcting unsuitable language may take additional time. The study concerns the total workflow, not just the speed of generating text. Neither time change has yet been measured.


### 15.1 Deduction

Deduction derives expectations from stated premises. Write each logical step and expose additional assumptions needed to reach the hypothesis. A citation to a theory does not replace the argument connecting its propositions to the present setting.


### 15.2 Induction and abduction

Induction develops patterns from observations; abduction seeks a plausible explanation for something puzzling. Both require disciplined comparison and revision. Maintain records of how categories and explanations changed rather than disguising discovery as a fully prespecified test.


### 15.3 Mechanisms

A mechanism describes how an outcome is generated, not merely a variable inserted between two others. Identify actors, actions, and enabling conditions. Consider whether the evidence observes that process or only an association compatible with it.


### 15.4 Process

A process explanation concerns sequence, timing, turning points, and feedback. The same events in a different order may have different consequences. Use temporal evidence to justify transitions rather than drawing arrows based only on retrospective narrative.


### 15.5 Moderators

A moderator specifies how a relationship varies with a condition. Explain why variation should occur, not only that it might. A contextual label such as industry requires a substantive account of the relevant difference.


### 15.6 Rival explanations

A rival explanation is an alternative account that could produce similar observations. Choose plausible rivals and derive their distinct implications. Defeating an implausibly weak alternative does little to establish the preferred explanation.


### 15.7 Boundary conditions

Boundary conditions specify where an explanation applies or changes. They can involve actors, institutions, technologies, or periods. Distinguish a theoretically justified boundary from a restriction imposed solely by available data.


### Returning to the example: reasoning and lesson

A mechanism account connects the feature to actions: automatic drafting replaces some writing, while uncertainty about output prompts checking. The net effect may depend on task difficulty or available expertise. Measuring total time alone would not distinguish these paths. The lesson is to specify the intermediate activities and the conditions under which they matter.


### Reviewer lens

What evidence would distinguish your explanation from the strongest alternative?


### Exercise and deliverable

Draw an argument map and specify discriminating observations.


## Chapter 16: Building a research proposal

We can now combine a question, a literature position, concepts, and a proposed explanation into a plan. A proposal makes consequential choices visible before expensive execution. It should show what evidence is needed, what is feasible, and what would change if access or assumptions fail.


### Learning objective

Integrate a question, contribution, and feasible evidence strategy.


### Opening example 16 (hypothetical): A proposal constrained by access

A fictional platform offers a researcher aggregate weekly usage counts but no user-level records or ability to randomize a policy. The researcher initially proposes estimating individual responses to personalized recommendations. The available evidence cannot support the proposed level of analysis.


### 16.1 Problem statement

A problem statement establishes the phenomenon, consequential uncertainty, and intended learning. Support its factual premises. Avoid starting with a solution and retrofitting a problem whose importance depends on the solution already being successful.


### 16.2 Literature position

Literature positioning locates the study within a specific conversation and names what it changes. Identify closest work fairly. Broad claims that nobody has studied the topic are fragile substitutes for a precise comparison.


### 16.3 Theory

A proposal’s theory component should clarify concepts and reasoning at the maturity appropriate to the approach. A theory-building study may propose sensitizing concepts and an inquiry strategy rather than a finished hypothesis model.


### 16.4 Preliminary design

A preliminary design states what evidence will be collected and what comparisons or interpretations it permits. Map every major promise to obtainable material. Flag the most fragile assumption and the pilot that can investigate it.


### 16.5 Resource needs

Resource needs include participant access, permissions, collaborator expertise, time, and computational or financial costs. Estimate uncertainty in each dependency. A technically possible study may still be infeasible within a dissertation’s constraints.


### 16.6 Milestones

A milestone is a decision-relevant achievement, not merely a calendar date. Examples include validated measurement or secured field access. Specify the evidence that permits progression and the consequences if the milestone is missed.


### 16.7 Failure contingencies

Contingencies describe honest alternatives if assumptions, access, or measurements fail. Narrowing a claim can be preferable to adding unsupported analyses. Preserve the distinction between adapting a design and selectively searching for a favorable result.


### Returning to the example: reasoning and lesson

One option is to negotiate additional access; another is to formulate a question about aggregate dynamics that the available records can address. Neither option should silently turn aggregate changes into individual effects. A useful proposal states the access dependency, the fallback question, and the inference sacrificed by changing scope.


### Reviewer lens

Is the proposed evidence capable of supporting the promised contribution?


### Exercise and deliverable

Deliver a proposal and a decision memo explaining rejected alternatives.


# Volume 3: Research design and methodological routes

A question becomes a study through a justified design. Read Chapters 17 and 18 first, then examine the methodological routes in Chapters 19–24. They offer different ways to produce knowledge. A reader studying organizational meaning should not inherit the evaluation rules for a predictive model, and a prediction should not be presented as an intervention effect.

171819—24


## Chapter 17: Matching questions to research designs

A proposal must become a design that can answer its question. This chapter distinguishes describing, explaining, predicting, interpreting, and designing. Similar data can serve these purposes differently; select the comparison or analytic process by the claim you want to justify.


### Learning objective

Choose a design according to the intended knowledge claim.


### Opening example 17 (hypothetical): Predicting departure or explaining it?

A subscription platform records member activity and renewal. A team wants to identify members likely to leave next month; another wants to know whether sending reminders prevents departure. Both might use the same historical records, but only the second question concerns the effect of an intervention.


### 17.1 Descriptive, causal, predictive, interpretive, and design goals

A design must match the intended learning: describing prevalence, estimating an intervention effect, predicting an outcome, interpreting meaning, or evaluating an artifact. One dataset may support several goals, but each requires its own warrant and evaluation criterion.


### 17.2 Units

Distinguish the unit of assignment, observation, analysis, and theoretical claim. Randomizing teams while analyzing employees as independent can misstate uncertainty. Explain nesting and interactions before choosing a model.


### 17.3 Timing

Timing determines what precedes what, what participants have experienced, and what outcomes can emerge. A post-intervention measure of a supposed baseline trait can already be affected by treatment. Draw the measurement timeline explicitly.


### 17.4 Sampling

Sampling connects accessible observations to the population or case domain of interest. Probability, purposive, and theoretical sampling serve different aims. Justify the sampling logic within the design rather than treating representativeness as a universal checklist.


### 17.5 Feasibility pilots

A pilot investigates feasibility, comprehension, variation, and procedures. It is not a small study whose significance decides whether a question matters. Predetermine what pilot evidence will change the design and what it cannot establish.


### Returning to the example: reasoning and lesson

A predictive model is evaluated on new observations under an appropriate prediction setting. The reminder-effect question needs a credible comparison of outcomes with and without the reminder. A variable that predicts departure need not be a useful intervention target. The lesson is that data and statistical techniques do not by themselves determine the claim.


### Reviewer lens

What exactly is this design able to establish?


### Exercise and deliverable

Create a design-to-claim matrix and a pilot protocol.


## Chapter 18: Measurement, sampling, and ethics

Before choosing a specific method, establish what can be observed, who enters the study, and what responsibilities data collection creates. Measurement, sampling, and ethics affect the meaning of every later result. They are design decisions, not matters to repair only after analysis.


### Learning objective

Plan defensible observation and participant treatment.


### Opening example 18 (hypothetical): What does an acceptance log measure?

In a fictional workplace application, users can accept an AI recommendation with one click, while entering another answer takes several steps. The researcher observes high acceptance and proposes using it as a measure of trust. Only active users appear in the log.

AI


### 18.1 Operationalization

Operationalization maps a construct to observations through explicit rules. Explain coding, windows, aggregation, and ambiguous cases. Revisit the conceptual definition when convenient data measure a different property rather than silently renaming the proxy.


### 18.2 Reliability and validity

Reliability concerns consistency under specified conditions; validity concerns the warrant for an intended interpretation or use. Consistent measurement can be consistently wrong. Specify which interpretation is validated and which sources of error remain.


### 18.3 Sampling frames

A sampling frame is the operational list or mechanism from which units can be selected. Compare it with the intended population. Active-platform users exclude those who left, possibly precisely because of the phenomenon being studied.


### 18.4 Selection

Selection can occur at access, enrollment, response, survival, or analysis. Diagram these stages and identify how selection relates to the outcome. Statistical adjustment cannot repair unmeasured selection automatically.


### 18.5 Consent

Consent involves participants’ understanding and voluntary agreement under applicable review requirements. Public accessibility alone does not settle ethical acceptability. Document the research setting and consult the relevant institutional process for context-specific requirements.


### 18.6 Privacy

Privacy risks depend on identifiability, sensitivity, linkage, and potential misuse. Removing names may not prevent reidentification from combinations of attributes. Minimize data access and disclose only what the research purpose and permissions justify.


### 18.7 Access permissions

Access permission specifies what can be collected, processed, shared, and retained. A collaborator’s ability to open a dataset is not proof of permission for every use. Keep provenance and access conditions attached to the data.


### Returning to the example: reasoning and lesson

The interface creates a convenience explanation, and the observed sample excludes people who avoid the application. Define the construct, examine the action’s alternatives, and specify the target population before interpreting the rate. Collection and use of additional records also require an appropriate ethical process. The lesson is that measurement, selection, and participant interests belong in design.


### Reviewer lens

Who and what is missing from the data, and how does this affect claims?


### Exercise and deliverable

Deliver a measurement plan, sample flow, and ethics questions for institutional review.


## Chapter 19: Archival and quasi-experimental research

This route examines records generated outside a researcher-controlled experiment. The central problem is how observed comparisons relate to the comparison the question requires. Models help organize evidence, but the source of variation and the assumptions linking it to the claim remain decisive.


### Learning objective

Explain identification before estimating a model.


### Opening example 19 (hypothetical): A platform policy with unequal exposure

Imagine a platform introducing a visibility rule in some communities before others. Communities differ in size, activity, and rollout timing. Researchers have repeated community-level outcomes and want to know whether the rule changes participation. The rollout is not described as randomized.


### 19.1 Endogeneity

Endogeneity broadly concerns a regressor’s relationship with unmodeled determinants of an outcome in a specified model. Causes include confounding, simultaneity, and some measurement errors. Name the concrete source instead of treating endogeneity as a generic criticism.


### 19.2 Confounding

A confounder influences treatment or exposure and outcome in a way relevant to the causal question. More controls are not always better: conditioning on mediators or colliders can change or distort the target comparison.


### 19.3 Target effects

A target effect specifies treatment versions, outcome, population, comparison, and horizon. The effect among treated adopters differs from the effect across all eligible users. Write the estimand before choosing weights, sample restrictions, or estimators.


### 19.4 Panel designs

Panel data repeatedly observe units but do not automatically establish causality. Unit effects can address certain stable differences, not all time-varying confounding. Explain which variation identifies the estimate and which assumptions remain.


### 19.5 Differences-in-differences

Differences-in-differences compares changes across differently exposed groups under a counterfactual trend assumption. Anticipation, spillovers, composition, and staggered timing matter. Flat pre-period estimates do not prove parallel counterfactual trends after treatment.


### 19.6 Discontinuities

Regression discontinuity uses a treatment rule at a threshold to compare nearby units under continuity conditions. Examine manipulation, other threshold changes, bandwidth, and treatment compliance. The resulting local effect need not describe the whole population.


### 19.7 Instruments

An instrument shifts treatment and must satisfy the relevant independence and exclusion assumptions. A strong first stage alone is insufficient. Explain why the instrument has no disallowed path to the outcome and what population the effect concerns.


### 19.8 Matching

Matching creates comparability on selected observed covariates, conditional on design choices and support. It does not balance unobserved causes by magic. Report overlap, balance, exclusions, and whether matching changed the population represented by the estimate.


### Returning to the example: reasoning and lesson

A before-and-after difference can combine the rule with other changes. A comparison across communities also requires explaining why their outcome paths provide a credible alternative. Specify treatment timing, exposure, target effect, and threats such as spillovers. The lesson is to justify the comparison that identifies the effect, not merely add a policy indicator to a model.


### Reviewer lens

Where does the counterfactual come from, and what can invalidate it?


### Exercise and deliverable

Write an identification memo and a design-specific falsification plan.


## Chapter 20: Experiments and behavioral research

Experiments deliberately vary conditions to learn from a comparison. This chapter separates what is assigned from what participants experience and from the process the researcher hopes to explain. Random assignment strengthens a particular comparison; it does not automatically validate every measure or mechanism claim.


### Learning objective

Design interventions that distinguish competing explanations.


### Opening example 20 (hypothetical): Separating the AI label from advice quality

Imagine an online decision task where participants see the same advice labeled either “AI-generated” or “human-generated.” Assignment is random, and the advice content is held constant. A different study instead changes both label and quality. These are hypothetical designs.

AI


### 20.1 Randomization

Randomization makes assignment independent of pre-assignment characteristics in the assignment mechanism, not perfectly balanced in every realized sample. Preserve the assignment record, analyze at the appropriate level, and examine interference and implementation failures.


### 20.2 Manipulation

A manipulation operationalizes the intervention. If explanation length and explanation quality change together, the experiment may not isolate the intended construct. Pilot materials and consider multiple operationalizations to distinguish the theoretical ingredient from incidental details.


### 20.3 Factorial designs

Factorial designs vary multiple factors to study separate and joint effects. An interaction is defined relative to an outcome scale and model. Specify the comparison of interest; inspecting separate significance tests does not test interaction.


### 20.4 Power

Power planning links sample size to a meaningful effect, variance, design, and decision criterion. Include clustering and expected attrition. Planning around an unrealistically large effect creates a study that cannot resolve the actual substantive uncertainty.


### 20.5 Demand effects

Demand effects arise when participants infer the study’s purpose and adjust behavior. Examine instructions, labels, incentives, and investigator contact. Concealing a hypothesis is not sufficient if the task transparently rewards the expected response.


### 20.6 Noncompliance

Noncompliance separates assignment from treatment received. Intention-to-treat analysis answers an assignment question; effects of actual receipt require additional assumptions. Do not discard noncompliers merely to recover a cleaner-looking treatment effect.


### 20.7 Attrition

Attrition concerns missing outcomes after assignment and can undermine comparability. Compare reasons and patterns across conditions, consider plausible missingness mechanisms, and report sensitivity. A balanced starting sample does not guarantee an unbiased final sample.


### 20.8 Laboratory and field settings

Laboratory and field settings trade different forms of control, realism, access, and observability. Neither is automatically superior. Specify which theoretical process the setting captures and which features limit transfer to other contexts.


### Returning to the example: reasoning and lesson

The first design can address the effect of the displayed label under its conditions. The second cannot attribute a difference to the label alone without further design structure. Even the first does not by itself prove that trust is the mechanism. The lesson is to distinguish the assigned contrast, its interpretation, and any proposed psychological process.


### Reviewer lens

Does the manipulation change only what the theory requires?


### Exercise and deliverable

Prepare stimuli, assignment logic, pilot checks, and an analysis plan.


## Chapter 21: Surveys and latent-variable research

Some questions concern beliefs or other concepts that cannot be read directly from a log. Survey research turns definitions into responses through an instrument. The key task is to justify that translation before interpreting relationships among scores.


### Learning objective

Connect construct definitions to measurement and structural claims.


### Opening example 21 (hypothetical): Moving a questionnaire across roles

A fictional study adapts a questionnaire about trust in a workplace system for managers and frontline staff, in two languages. Managers can inspect audit trails; frontline staff cannot. An item about “being able to verify the system” may therefore refer to different experiences.


### 21.1 Scale adaptation and development

Scale development begins with the construct domain; adaptation examines whether existing items retain their meaning in a new setting. Translation alone is insufficient. Preserve coverage and document why items were changed, removed, or added.


### 21.2 Cognitive interviews

Cognitive interviews explore how respondents interpret questions and form answers. Ask participants to explain terms, recall periods, and response choices. An item can be statistically consistent yet systematically misunderstood.


### 21.3 Reflective and formative specifications

Reflective and formative specifications encode different relations between a construct and its indicators. Do not choose by whichever model fits best. Explain the conceptual direction and the consequences of omitting an indicator.


### 21.4 Factor models

Factor models describe patterns of covariance under assumptions about latent structure and measurement error. Fit indices are diagnostic evidence, not proof of conceptual truth. Inspect item content, residuals, alternatives, and the intended interpretation.


### 21.5 Invariance

Measurement invariance asks whether measurement relations are sufficiently comparable across groups or occasions for the intended comparison. Without appropriate comparability, a mean difference may reflect item functioning rather than a construct difference.


### 21.6 Common-method issues

Common-method issues arise when measurement procedures create shared variation unrelated to the substantive relationship. Consider design remedies and plausible method processes. A single post hoc diagnostic cannot certify that all common-method bias is absent.


### Returning to the example: reasoning and lesson

Accurate translation is necessary but may not preserve the construct across roles. Examine comprehension and the meaning of responses before comparing scores or structural relationships. Differences may reflect access, interpretation, or the focal belief. The lesson is to validate the measurement interpretation in its new setting rather than assume that an existing scale guarantees equivalence.


### Reviewer lens

Does acceptable model fit resolve the actual measurement concern?


### Exercise and deliverable

Deliver a construct-to-item table and a validation plan with decision rules.


## Chapter 22: Qualitative and process research

Other questions require understanding action, meaning, and development within a setting. Qualitative inquiry can examine how events connect and how participants interpret them. This chapter develops the relationship between access, records, interpretation, and a defensible process account.


### Learning objective

Build an auditable interpretation while respecting the chosen tradition.


### Opening example 22 (hypothetical): Following changing interpretations

Imagine a company introducing a monitoring dashboard. Early interviews describe it as helpful coordination; later interviews mention surveillance. The researcher also has observations of meetings and records of changes to how managers use the dashboard. The task is to understand the development, not simply count positive and negative words.


### 22.1 Case selection

Case selection should serve the explanatory, comparative, or theory-building logic. Typical, extreme, contrasting, and revelatory cases offer different learning opportunities. Access convenience can constrain selection but should not be presented as theoretical necessity.


### 22.2 Access

Access shapes which people, activities, and documents become visible. Record gatekeepers, exclusions, and changes in relationships. An official organizational account may differ from what less powerful participants can safely disclose.


### 22.3 Interviews and observation

Interviews elicit situated accounts; observation reveals practices under particular conditions. Neither is a transparent window onto reality. Use probes, contextual detail, and comparison to examine discrepancies between what people say and do.


### 22.4 Coding

Coding organizes material for analytic purposes and may evolve with interpretation. Explain how codes connect to concepts and how revisions occurred. Frequency alone does not determine a theme’s theoretical importance, and coding agreement is not every tradition’s criterion.


### 22.5 Temporal sequences

Temporal sequences order events and interpretations to examine change. Distinguish event dates from retrospective recollections and identify uncertain transitions. A plausible chronology is not yet a demonstrated process explanation.


### 22.6 Negative cases

Negative cases challenge a developing interpretation. Investigate whether they reveal error, a boundary, or an alternative process. Do not hide inconvenient accounts or force them into categories that erase their challenge.


### 22.7 Reflexivity

Reflexive analysis records how researcher identity, relationships, and theoretical commitments shape interpretation. Show concrete consequences and responses. A personal-position statement is useful only when connected to actual research decisions.


### 22.8 Interpretation

Interpretation connects particular accounts and observations to a defensible understanding while preserving context. Present enough evidence for readers to evaluate the connection. Generalization may be conceptual or process-based rather than a population-frequency claim.


### Returning to the example: reasoning and lesson

Construct a chronology linking events, actions, and accounts. Examine whether changed use, changed participants, or changed interview conditions could explain the difference. Retain conflicting accounts rather than force consensus. The lesson is that a process explanation requires evidence connecting stages, not merely two snapshots and a plausible narrative.


### Reviewer lens

How are interpretations grounded, challenged, and bounded?


### Exercise and deliverable

Produce an interview guide, analytic memo, and evidence-to-interpretation trail.


## Chapter 23: Design science and mixed methods

Two routes are taught separately here. Design science asks how constructing and evaluating an artifact can produce knowledge. Mixed methods asks how different forms of evidence jointly answer a question. Building a tool does not by itself make a study mixed methods, and combining methods does not by itself create design knowledge.


### Learning objective

Understand two distinct routes and when combining evidence is useful.


### Opening example 23 (hypothetical): Two distinct routes around a decision aid

A fictional team designs a decision aid that presents uncertainty alongside recommendations. It compares two interface designs on relevant tasks. Separately, another team interviews workers to understand checking practices and uses those insights to design a field experiment. The two projects share a domain but have different research structures.


### 23.1 Design requirements

Design requirements express what an artifact must accomplish for whom and under what constraints. Distinguish user requests from inferred needs and competing stakeholder objectives. Explain how requirements were elicited and prioritized.


### 23.2 Artifacts

An artifact may be a construct, model, method, or implemented system, depending on the study. Describe its components and intended operation. Building something demonstrates existence, not automatically usefulness, novelty, or generalizable knowledge.


### 23.3 Design principles

A design principle connects a problem class, recommended action, and expected consequence under conditions. State the rationale and supporting evaluation. Principles should be specific enough to guide another designer while not merely describing one implementation.


### 23.4 Evaluation environments

Evaluation environments determine which aspects of performance and use are tested. Technical benchmarks, expert judgments, and organizational deployments answer different questions. Use a sequence justified by the contribution and report unresolved environmental limitations.


### 23.5 Mixed-method sequencing

Mixed-method sequencing specifies why one phase precedes, follows, or runs alongside another. Qualitative work might develop constructs or explain an unexpected quantitative pattern. Sequence should follow the learning objective, not a desire to include more methods.


### 23.6 Integration

Integration is the deliberate connection of evidence, sampling, constructs, or interpretation across methods. A paper with separate qualitative and quantitative sections is not necessarily integrated. State exactly what becomes knowable through combining them.


### 23.7 Conflicting evidence

Conflicting evidence is an analytic opportunity, not a nuisance to average away. Examine differing populations, meanings, times, and measurement assumptions. Retain unresolved disagreement when reconciliation would require speculation unsupported by either source.


### Returning to the example: reasoning and lesson

The first must connect requirements, design choices, evaluation, and knowledge extending beyond the prototype. The second must explain how qualitative and quantitative evidence are integrated and what each contributes. Neither route is established by a label. The lesson is to evaluate design science and mixed methods through their own reasoning obligations.


### Reviewer lens

What knowledge exceeds the local artifact, or emerges from integrating methods?


### Exercise and deliverable

Choose one route and deliver either an artifact evaluation plan or a joint-evidence design.


## Chapter 24: Computational, analytical, and synthesis routes

This chapter introduces distinct computational, analytical, simulation, and synthesis routes. Each has a different object of evaluation: for example, predictive performance, model implications, behavior under simulated assumptions, or the evidence across studies. Keep those objects explicit as you choose a route.


### Learning objective

Recognize distinct standards for prediction, formal models, and evidence synthesis.


### Opening example 24 (hypothetical): Different outputs from the same platform domain

Imagine a marketplace concerned about misleading listings. One researcher predicts which listings moderators will flag. Another builds a model of seller incentives. A third simulates behavior under specified rules, while a fourth reviews intervention studies. No method is assumed to answer all four questions.


### 24.1 Text and network analysis

Text and network representations are measurements with consequential construction choices. Tokenization, labels, edges, direction, and time windows shape findings. Validate representation against the intended concept before treating computational output as substantive evidence.


### 24.2 Prediction

Prediction estimates outcomes for new cases under a stated use scenario. Define when predictions are made, which information is then available, and how errors matter. High predictive accuracy does not establish the causes of the outcome.


### 24.3 Formal assumptions and equilibrium

Analytical models derive implications from formal assumptions about actors, constraints, and behavior. An equilibrium is a solution concept, not direct evidence that people behave accordingly. Examine existence, alternative assumptions, and the interpretation of comparative results.


### 24.4 Simulation

Simulation generates outcomes from specified rules and parameters. Validate implementation separately from the adequacy of the model for the phenomenon. Sensitivity across parameters reveals dependence on assumptions but does not by itself validate those assumptions.


### 24.5 Systematic review

A systematic review makes search, selection, appraisal, and synthesis explicit. Define the question and unit of evidence, including multiple reports from one study. Transparency does not eliminate judgment; it makes consequential judgments inspectable.


### 24.6 Meta-analysis

Meta-analysis combines compatible estimates under an explicit statistical model. Examine effect definitions, dependence, heterogeneity, and selection of reported results. Pooling incompatible constructs can produce a precise number that answers no coherent question.


### Returning to the example: reasoning and lesson

A prediction needs relevant out-of-sample evaluation; an analytical model needs defensible assumptions and derivations; a simulation needs a clear relationship between rules and outcomes; a synthesis needs systematic selection and appraisal. Their conclusions have different scopes. The lesson is to identify what each route establishes before combining their implications.


### Reviewer lens

Is the evaluation criterion appropriate to the claimed contribution?


### Exercise and deliverable

Select a route and write its assumptions, validation strategy, and failure conditions.


# Volume 4: From observations to credible knowledge

This volume follows evidence from its generation to its interpretation and reconstruction. The recurring platform examples make time windows, denominators, selection, and dependence visible. Read them as invented demonstrations of reasoning. They are not results from the author’s or reader’s real projects. The task throughout is to ask whether the implemented evidence still answers the intended question.


## Chapter 25: Understanding data generation

After design comes execution, but a dataset should not be treated as a transparent record of reality. This chapter reconstructs how observations were created, retained, and selected. That history determines what each row can represent and which comparisons remain meaningful.


### Learning objective

Explain how a record came to exist before analyzing it.


### Opening example 25 (hypothetical): Lifetime counts and equal follow-up

A fictional community dataset reports the total responses received by each question at a download date. Older questions have been visible longer than newer ones. The researcher wants to compare engagement around a platform change. The downloaded totals do not automatically give equal observation periods.


### 25.1 Platform logging

A platform log is produced by software rules, not by a neutral recording of all behavior. Examine event definitions, logging changes, automated activity, and missing offline work. A changed interface may alter recorded clicks without changing the underlying construct.


### 25.2 Observation windows

An observation window defines the opportunity for events to accumulate. Older items may have more time to receive responses. Align windows with the question and distinguish no observed event from incomplete follow-up.


### 25.3 Event time

Event time indexes observations relative to an occurrence; calendar time indexes shared historical periods. Both may matter when adoption is staggered. Explain how seasonality, anticipation, and exposure duration interact with the chosen clock.


### 25.4 Missingness

Missingness may reflect nonresponse, noncollection, access restrictions, or processing failure. These mechanisms have different implications. Imputation requires assumptions and uncertainty accounting; filling cells does not recreate information that was never observed.


### 25.5 Deletion

Deletion can be related to quality, moderation, risk, or user exit. A surviving-content dataset may exclude the very outcomes under study. Document what the data source retains and how deletion could affect comparisons.


### 25.6 Censoring

Censoring means an event or duration is only partially observed because observation ends or begins at a boundary. It differs from an observed zero. Specify the risk period and choose analysis consistent with the observation process.


### 25.7 Composition

Composition changes when the mix of units changes over time or across groups. An average can rise because low-outcome users leave even if no remaining user improves. Separate within-unit change from changing membership when the question requires it.


### 25.8 Linkage

Data linkage joins records thought to concern the same entity. False matches and missed matches can be selective. Specify keys, time validity, duplicate handling, and match-quality checks rather than assuming a successful join produces a valid panel.


### Returning to the example: reasoning and lesson

If the question concerns engagement during a fixed period after posting, reconstruct that period from event dates where possible. If such dates are unavailable, acknowledge the resulting measurement limit rather than rename lifetime counts. The lesson is that the time window is part of the outcome’s definition, not just a data-cleaning preference.


### Reviewer lens

Could recording practices generate the apparent finding?


### Exercise and deliverable

Create a data-generating-process map and a variable provenance table.


## Chapter 26: Exploration and analysis planning

Knowing how data were generated makes exploration more informative. We now distinguish learning about data from evaluating a claim with them. An analysis plan should preserve the connection between question and decision while making unexpected discoveries visible and open to further examination.


### Learning objective

Use exploration productively while distinguishing it from confirmation.


### Opening example 26 (hypothetical): An unexpected subgroup pattern

During exploration of a fictional employee dataset, a researcher notices that an association looks stronger among newcomers than experienced staff. The subgroup comparison was not planned, and several other partitions were also examined. The pattern may be informative, but its discovery history matters.


### 26.1 Distributions

Distributions reveal scale, skew, rare events, and meaningful subpopulations. Examine denominators and conditional patterns before modeling. A mean can hide a bimodal process, while transformations can change which differences dominate interpretation.


### 26.2 Anomalies

An anomaly can indicate error or substantive discovery. Trace it back to raw records before excluding it. Define exclusion logic by the measurement process and research question rather than its effect on the preferred coefficient.


### 26.3 Exploratory choices

Exploratory choices include transformations, subgroup searches, outcomes, and time windows. Track them so later readers can distinguish discovery from confirmation. Exploration is valuable when reported honestly and followed by appropriate validation where possible.


### 26.4 Preregistration when appropriate

Preregistration records planned questions and decisions before relevant results are examined. It supports transparency but does not guarantee good design. Specify contingencies and distinguish confirmatory tests from later exploratory analyses rather than pretending nothing can change.


### 26.5 Holdouts

A holdout is reserved evidence not used to select the model or claim being evaluated. Repeatedly inspecting it makes it part of development. Separate development, tuning, and final evaluation according to the intended generalization.


### 26.6 Deviations

A deviation is a departure from the original plan and may be well justified. Record when it occurred, what motivated it, and whether results were already known. Distinguish correcting an error from choosing a more favorable specification.


### 26.7 Transparent reporting

Transparent reporting connects questions, choices, results, and limits without turning the paper into an unstructured diary. Preserve consequential alternatives in appendices or records. Narrative coherence does not justify hiding contrary evidence.


### Returning to the example: reasoning and lesson

Document the exploratory choices and consider a substantive explanation before designing a further test. Independent data or a suitably separated evaluation can help assess whether the pattern persists. Do not rewrite the history as a prespecified hypothesis. The lesson is to convert exploration into transparent learning and follow-up rather than hide it.


### Reviewer lens

Was the hypothesis selected after observing the same evidence used to test it?


### Exercise and deliverable

Produce an exploration log and a prospective analysis specification.


## Chapter 27: Estimation and statistical reasoning

An estimate is a numerical answer to a specified question, not a self-contained conclusion. This chapter explains how target quantities, variation, uncertainty, and practical importance fit together. Interpretation begins by asking what was estimated and for whom, before asking whether a threshold was crossed.


### Learning objective

Interpret estimates and uncertainty without ritual use of thresholds.


### Opening example 27 (hypothetical): Precision and importance answer different questions

Consider two hypothetical estimates expressed in the same meaningful outcome units. One is very small with a narrow uncertainty interval; the other is much larger with a wide interval that includes no change. Assume the designs are otherwise credible for the purpose of this comparison.


### 27.1 Estimands

An estimand is the precisely defined quantity the study seeks to learn. It can concern an average, contrast, distribution, or causal effect. Different weighting rules can target different populations even when the same observations are used.


### 27.2 Estimators

An estimator is a rule for calculating an estimate from data. Its desirable properties depend on assumptions and the target quantity. Choosing a sophisticated estimator cannot compensate for an undefined target or fundamentally missing comparison.


### 27.3 Standard errors

A standard error estimates sampling variability under a model or design. It is not the spread of individual outcomes and does not capture every source of uncertainty. Explain clustering, resampling, and any generated-measure uncertainty relevant to the study.


### 27.4 Confidence intervals

A frequentist confidence interval is produced by a procedure with a stated repeated-sampling coverage under assumptions. It is not automatically a probability distribution over the fixed parameter. Discuss the range of substantively different values compatible with the analysis.


### 27.5 Tests

A hypothesis test assesses compatibility with a specified null under assumptions; its p-value is not the probability that the null is true. Distinguish rejecting a point null from establishing an important or theoretically unique explanation.

p


### 27.6 Power

Power concerns the chance of detecting specified alternatives under a design. Low precision can make a nonsignificant result inconclusive rather than evidence of no meaningful effect. Use interval estimates and, when justified, equivalence-oriented questions.


### 27.7 Practical magnitude

Practical magnitude interprets an effect in meaningful units, baselines, costs, and affected populations. A relative percentage can exaggerate a tiny absolute change. Do not infer a beneficial decision without considering implementation and side effects.


### 27.8 Dependence

Dependence arises when observations share shocks, actors, organizations, networks, or repeated measurement. The effective information can be far smaller than the row count. Align uncertainty estimation with the design and relevant dependence structure.


### Returning to the example: reasoning and lesson

The first may establish a small effect precisely without making it practically consequential. The second may leave both important benefit and little benefit plausible. Report size, uncertainty, and the decision context rather than rank the studies by statistical significance alone. The lesson is to separate what magnitude matters from how well it is known.


### Reviewer lens

What range of conclusions is compatible with the evidence?


### Exercise and deliverable

Annotate a results table and rewrite overstated interpretations.


## Chapter 28: Diagnostics and model adequacy

A result can be computed correctly and still depend on an unsuitable model or a few influential observations. Diagnostics investigate these dependencies. The purpose is to learn whether the model serves the question and where its assumptions fail, not to search mechanically for a preferred result.


### Learning objective

Identify whether model behavior undermines the intended inference.


### Opening example 28 (hypothetical): One large community dominates

A fictional study combines records from many online communities, one of which contributes most observations. The pooled result changes substantially when that community is examined separately. Communities may also contain correlated observations. The researcher must decide what population and weighting the claim concerns.


### 28.1 Functional form

Functional form encodes how predictors relate to outcomes. A linear approximation may obscure thresholds or saturation. Explore theoretically meaningful alternatives, but distinguish planned tests from outcome-driven searches across many curves.


### 28.2 Residuals

Residuals are discrepancies between observations and model predictions under a specified model. Their patterns can reveal misspecification, but no single plot certifies validity. Interpret diagnostics in relation to the model’s purpose and data structure.


### 28.3 Influential observations

Influential observations substantially affect an estimate or fit. Influence does not imply error. Determine whether a dominant case belongs to the target population, then report what alternative weighting or exclusion changes about the question.


### 28.4 Separation

Separation occurs in some binary-response models when predictors perfectly or nearly distinguish outcomes, making ordinary estimation problematic. Inspect sparse cells and model design. Do not interpret enormous coefficients as strong substantive evidence before diagnosing estimation failure.


### 28.5 Convergence

Convergence indicates an algorithm met a stopping criterion, not that the model is correct or the optimum substantively meaningful. Examine initialization, numerical stability, diagnostics, and alternative solutions when the problem warrants it.


### 28.6 Support

Support concerns whether relevant comparisons exist in observed covariate or design space. Estimating beyond support relies heavily on extrapolation. Identify unsupported populations rather than presenting model-generated predictions as directly observed comparisons.


### 28.7 Dependence

Dependence diagnostics should examine repeated actors, nested groups, common time shocks, and network connections. A clustering choice follows the inferential problem, not whichever option yields significance. Explain limits when the number of independent groups is small.


### 28.8 Implementation errors

Implementation errors include incorrect joins, reversed labels, leakage, wrong denominators, and stale outputs. Verify a small example by hand and trace results to inputs. A statistically robust pattern can still be a consistently reproduced coding error.


### Returning to the example: reasoning and lesson

The large community is not automatically an error to delete. Inspect whether the result represents an average record, an average community, or a particular setting. Address dependence and report how influence affects interpretation. The lesson is to diagnose the source of an estimate before treating a preferred exclusion as a robustness success.


### Reviewer lens

Is this a substantive pattern, a modeling artifact, or a coding error?


### Exercise and deliverable

Deliver a diagnostic report with consequences and targeted remedies.


## Chapter 29: Robustness, sensitivity, and falsification

Once the main result is understood, ask what could change its interpretation. Robustness, sensitivity, and falsification serve different purposes. This chapter explains how to select checks by the threat they address and report when a check changes the question rather than tests the same claim.


### Learning objective

Link each additional analysis to a specific threat.


### Opening example 29 (hypothetical): A new outcome may answer a new question

In a fictional platform study, the original outcome is whether a question receives any answer within seven days. A suggested check replaces it with the total number of answers over the question’s lifetime. These measures differ in both intensity and observation window.


### 29.1 Alternative measurements

Alternative measures examine whether a conclusion depends on a particular operationalization. Explain which alternatives capture the same construct and which change it. Agreement among several equally flawed proxies does not establish validity.


### 29.2 Samples

Alternative samples can test scope or sensitivity, but exclusions change who is represented. Explain why a restriction is meaningful before inspecting its result. Separate correcting ineligible observations from redefining the target population.


### 29.3 Model choices

Alternative models assess dependence on assumptions such as functional form or error structure. They need not estimate the same quantity. Compare interpretations and assumptions, not just whether every coefficient retains the same significance symbol.


### 29.4 Placebo tests

A placebo test examines an implication expected to be absent under the proposed explanation. Its informativeness depends on a reasoned null prediction and adequate sensitivity. Passing a weak placebo does not certify the full identification strategy.


### 29.5 Unobserved confounding

Sensitivity analysis for unobserved confounding asks how strong omitted influences would need to be under a specified model to change a conclusion. Interpret the sensitivity parameters substantively and avoid treating an assumed bound as an observed fact.


### 29.6 Specification uncertainty

Specification uncertainty reflects multiple defensible analysis choices. Define the admissible set based on theory and data quality, then examine variation transparently. Including many implausible models is not a substitute for justified choices.


### Returning to the example: reasoning and lesson

The second analysis can be informative but need not be a test of the identical claim. Explain which feature changes and whether that change addresses a threat to the original interpretation. Preserve the primary question while reporting the alternative on its own terms. The lesson is to distinguish sensitivity within a claim from movement to another claim.


### Reviewer lens

What threat does this check address, and what remains unresolved?


### Exercise and deliverable

Build a threat-to-test matrix, including checks that cannot settle the issue.


## Chapter 30: Mechanisms and heterogeneous findings

A main result often raises further questions about how it occurs and whom it affects. This chapter separates process evidence from subgroup variation. Differences among estimates can motivate theory, but they require appropriate comparisons and do not automatically reveal a mechanism.


### Learning objective

Distinguish patterned variation from evidence for a mechanism.


### Opening example 30 (hypothetical): One significant group and one nonsignificant group

A hypothetical study estimates a policy effect separately for small and large communities. One estimate crosses a significance threshold and the other does not. Their standard errors differ, and the question is whether the effects themselves differ between groups.


### 30.1 Mediation assumptions

Mediation concerns an effect operating through an intermediate variable and requires assumptions beyond an ordinary association. Treatment may affect mediator-outcome confounders. Measuring a mediator after treatment does not by itself identify a causal pathway.


### 30.2 Moderators

Moderation asks whether a relationship differs with a condition; it does not necessarily explain how the relationship is generated. Define the moderator’s timing and meaning. A post-treatment subgroup can create selection rather than reveal a stable boundary.


### 30.3 Subgroup comparisons

Subgroup estimates describe results within groups. A significant estimate in one group and a nonsignificant estimate in another do not establish a difference between groups. Compare the estimates directly and retain uncertainty.


### 30.4 Pooled tests

A pooled interaction or another direct contrast tests a specified between-group difference under its model. Interpret it on the appropriate scale, especially with nonlinear models. Explain whether the contrast was prespecified or emerged from exploration.


### 30.5 Multiple testing

Multiple testing increases opportunities for misleading discoveries across a family of tests. Define the family and the relevant error criterion. Adjustment addresses multiplicity, not bad measurement, invalid identification, or selective suppression of unsuccessful tests.


### 30.6 Alternative pathways

Alternative pathways can produce the same average effect or subgroup pattern. Derive distinguishable predictions and seek process, experimental, or temporal evidence where appropriate. Label suggestive patterns as suggestive when the design cannot separate pathways.


### Returning to the example: reasoning and lesson

Different threshold labels do not answer the between-group question. Estimate and evaluate the contrast directly with a design-appropriate procedure, considering dependence and the set of comparisons. Even a credible difference would not by itself reveal why it occurs. The lesson is to keep subgroup estimates, heterogeneity, and mechanisms distinct.


### Reviewer lens

Was a between-group difference actually tested? What identifies the mechanism?


### Exercise and deliverable

Write a boundary-condition claim and specify its evidence limits.


## Chapter 31: Prediction, generalization, and AI measurement

Performance within one dataset is not enough when a claim concerns new people, periods, or tasks. This chapter examines prediction and transport to new settings, including AI-generated measures. Validation must match the intended use rather than rely on an impressive overall score.

AI


### Learning objective

Evaluate models under the intended deployment and measurement conditions.


### Opening example 31 (hypothetical): Validating an AI-generated text measure

A fictional team asks a language model to label whether community posts contain a particular kind of advice. They have written a coding definition and obtain independently reviewed human labels for a held-out sample. Posts vary in length and style, and the intended analysis compares groups.


### 31.1 Data leakage

Leakage occurs when development or prediction uses information unavailable under the intended evaluation scenario. It includes future variables, duplicated entities, and preprocessing informed by test data. Audit the entire pipeline, not only the model’s input columns.


### 31.2 Temporal and grouped splits

Temporal and grouped splits reflect what must generalize: future periods, unseen users, organizations, or environments. Random row splits can overstate performance when related observations appear on both sides. Choose separation based on the intended use.


### 31.3 Benchmarks

A benchmark defines a task, data, metrics, and comparison protocol. Examine representativeness, contamination, and whether improvements matter for the research question. A leaderboard gain can be technically real without resolving a substantive IS problem.

IS


### 31.4 Calibration

Calibration concerns agreement between predicted probabilities and observed frequencies in relevant groups or ranges. It differs from ranking ability. A model can rank cases well while giving probabilities unsuitable for resource allocation or communication.


### 31.5 Drift

Drift is change in inputs, relationships, labels, or deployment conditions over time. Monitor the type of change rather than treating all degradation identically. A performance drop may require revising measurement or use, not merely retraining.


### 31.6 Human labels

Human labels are judgments produced under instructions and conditions, not automatic ground truth. Examine expertise, ambiguity, disagreement, and incentives. Adjudication should preserve meaningful uncertainty rather than force certainty where the construct itself is contested.


### 31.7 Model versioning

Model versioning records the exact model, configuration, prompts, tools, and run conditions relevant to outputs. A commercial model name may not identify a stable system. Report what can be reproduced and what remains outside the researcher’s control.


### 31.8 Measurement validation

Measurement validation examines whether model outputs support the intended construct interpretation. Predicting human labels accurately is one piece of evidence, not the whole argument. Test relevant groups, edge cases, and consequences of systematic errors.


### Returning to the example: reasoning and lesson

Examine disagreements, label ambiguity, and errors within the groups relevant to the claim, not only overall agreement. Human labels also need a defensible process. Record the model and prompt used. The lesson is that successful automation means a measure is fit for its intended inference, not that it matches a few persuasive examples.


### Reviewer lens

Does performance persist under realistic separation and independent validation?


### Exercise and deliverable

Deliver an evaluation protocol and an error-analysis report.


## Chapter 32: Reproducibility and evidential synthesis

The evidence phase ends by making the reasoning and computation inspectable. Reproducibility allows others to reconstruct a result; synthesis asks how that result relates to other evidence. Neither substitutes for a sound design, but both make limitations and disagreements easier to investigate.


### Learning objective

Connect all major claims to traceable outputs and remaining uncertainty.


### Opening example 32 (hypothetical): Rebuilding a table and reassessing its claim

A fictional replication package contains data transformations, an analysis script, and a published table. A second researcher reproduces the coefficients but notices that the outcome counts events after the stated follow-up window. The numerical reproduction succeeds while a measurement concern remains.


### 32.1 Version control

Version control records changes in code and text and enables comparison across states. Connect reported results to a specific version. It does not replace data provenance or document every external dependency automatically.


### 32.2 Environments

An environment includes software versions, libraries, system assumptions, and relevant hardware. Reproducibility requires enough detail to reconstruct execution. A requirements list may be insufficient when system libraries or nondeterministic operations affect results.


### 32.3 Seeds

A seed initializes a random-number process but does not guarantee identical outputs across all libraries and hardware. Record repetitions and sources of randomness. Repeating one fixed seed cannot establish variability across stochastic runs.


### 32.4 Logs

Logs record execution, warnings, configuration, and failures. Design them to explain what ran and what did not, without exposing sensitive data. A completed process should be distinguished from a completed, validated analysis.


### 32.5 Data restrictions

Restricted data require an honest reproduction strategy: access instructions, permitted extracts, synthetic examples, or controlled execution where allowed. Synthetic data demonstrate code behavior but do not independently reproduce the empirical finding.


### 32.6 Reproducibility packages

A reproducibility package links inputs, transformations, estimation, and outputs with executable instructions where possible. Include a small smoke test and expected artifacts. State which results cannot be rebuilt without additional access or computation.


### 32.7 Contradictory and null findings

Contradictory and null findings belong in the evidential assessment. Evaluate precision, design differences, and measurement before resolving disagreement. An honest synthesis can leave several explanations open while specifying the next discriminating study.


### Returning to the example: reasoning and lesson

Record both facts. Repairing the window may change the estimate because it changes the implemented measure to match the intended one. Reproducibility made the discrepancy inspectable; it did not certify the original interpretation. The lesson is to distinguish rebuilding a computation from validating the question-to-evidence connection.


### Reviewer lens

Could another researcher reconstruct the result and understand its limits?


### Exercise and deliverable

Deliver a claim-evidence-limitation ledger and a reproducibility checklist.


# Volume 5: Writing, reviewing, and communicating

Evidence reaches readers through an argument. We move from paper structure to its opening, theory, methods, findings, displays, review, revision, and oral presentation. Fictional manuscript excerpts and reviewer situations make repair decisions concrete. Their purpose is to explain why a change improves the argument, not to imitate a particular editor or promise acceptance.


## Chapter 33: Architecting the paper’s argument

A reader needs the logic of the study, not a diary of every action taken. This chapter organizes question, contribution, design, evidence, and limits into an argument. The structure should make each major claim traceable to its support.


### Learning objective

Make sections work together toward a defensible contribution.


### Opening example 33 (hypothetical): Turning an analysis diary into an argument

A fictional draft describes successive regressions in the order they were run: an initial model, several alternatives, and a final preferred version. Readers cannot tell which question the models answer or which evidence is decisive. The research process was exploratory, but the paper still needs a clear argument.


### 33.1 Audience

The audience determines which prior knowledge can be assumed and which uncertainty is consequential. Identify a specific scholarly conversation without excluding adjacent readers. Explain specialized terms when they are necessary to follow the contribution.


### 33.2 Central claim

A central claim states the main learning the paper can defend. Make it precise enough to be challenged and narrow enough to match evidence. Several interesting analyses do not automatically combine into one contribution.


### 33.3 Argument sequence

Argument sequence guides readers from a consequential question through reasoning and evidence to a warranted conclusion. It need not reproduce the order in which the researchers worked. Preserve transparency about exploration while organizing for understanding.


### 33.4 Section roles

Each section performs a function: motivation establishes the problem, theory develops reasoning, methods explain evidence production, and discussion interprets learning. Functions vary by tradition. Judge structure by whether readers can evaluate the argument, not by fixed headings alone.


### 33.5 Evidence placement

Place decisive evidence near the claim it supports and procedural detail where it can be found. An appendix should not hide a result that reverses the main conclusion. Use cross-references to keep the argument readable and inspectable.


### 33.6 Omissions

Omission is defensible when material is redundant or outside scope, not when it is inconvenient to the conclusion. Explain consequential exclusions and retain research records. A focused narrative still needs to disclose evidence that changes interpretation.


### 33.7 Coherence

Coherence means constructs, units, comparisons, and claims remain consistent across the manuscript. Compare the abstract’s promise with the actual design and discussion. Elegant prose cannot repair a mismatch between the question and what was measured.


### Returning to the example: reasoning and lesson

Organize the main text around the question, design, principal evidence, and limits. Report exploratory origins and consequential choices transparently in appropriate places. Coherent presentation does not authorize rewriting what was planned. The lesson is to separate the logic readers need from a chronological activity log while preserving an honest record.


### Reviewer lens

Can a reader identify the contribution and the evidence for it?


### Exercise and deliverable

Create a reverse outline and a revised argument map.


## Chapter 34: Titles, abstracts, and introductions

With the argument established, its opening must show why a reader should continue. Titles, abstracts, and introductions operate at different lengths but must describe the same study. Start from the substantive problem and the change in understanding, then calibrate the promise to the evidence.


### Learning objective

Explain relevance and contribution precisely at different lengths.


### Opening example 34 (hypothetical): An introduction that explains the stakes

A fictional introduction says that AI is popular and no one has studied a particular application. The actual project examines how making recommendation uncertainty visible changes employees’ checking behavior. The draft has not explained why this behavior matters or what existing understanding leaves unresolved.

AI


### 34.1 Title promises

A title makes a promise about the phenomenon, relationship, or contribution. Avoid causal language if the design supports only association. A memorable title should still let a knowledgeable reader anticipate the study’s actual scope.


### 34.2 Abstract functions

An abstract states the problem, approach, main learning, and significance within limited space. Include the most consequential boundary when omission would mislead. A list of methods and significant coefficients does not communicate the contribution by itself.


### 34.3 Motivation

Motivation establishes why uncertainty matters to knowledge or practice. Support prevalence and importance claims separately: a widespread phenomenon may pose a trivial question, while a rare phenomenon may expose an important theoretical limit.


### 34.4 Prior understanding

Prior understanding is the most relevant state of knowledge, including what is already explained well. Present it charitably before identifying limits. Understating earlier work makes apparent novelty fragile and invites avoidable reviewer objections.


### 34.5 Tension

Tension arises when a credible expectation clashes with an observation or another credible account. Explain both sides. Artificially exaggerating a conflict creates drama but may disappear once definitions and contexts are examined.


### 34.6 Question

The introduction’s question should follow from the established uncertainty and remain aligned with the study. Avoid switching from a broad societal question to a narrow statistical test without explaining the connection.


### 34.7 Contribution

Contribution statements describe the change in knowledge, not a list of tasks performed. We collected a large dataset is an activity; showing how it revises an established understanding can support a contribution. Specify the actual change.


### 34.8 Scope

Scope statements identify populations, contexts, outcomes, and claims that remain outside the paper. They help readers interpret the contribution and need not be apologetic. Do not use broad language in the title and quietly narrow it only at the end.


### Returning to the example: reasoning and lesson

Introduce the decision problem, explain why checking could protect quality while consuming effort, and identify the uncertainty the study addresses. Then state what the design can establish. Do not assert that the proposed gap is real without literature work. The lesson is to earn attention through the problem and knowledge change, not novelty language alone.


### Reviewer lens

Does the opening promise more than the paper can establish?


### Exercise and deliverable

Draft an abstract and an introduction with claim-evidence annotations.


## Chapter 35: Writing theory and related work

The opening promises a contribution; the theory and literature sections explain its intellectual basis. This chapter turns citations into a reasoned account of what is known, what remains uncertain, and why the proposed relationship or process is plausible.


### Learning objective

Build an argument rather than a citation inventory.


### Opening example 35 (hypothetical): A hypothesis supported only by citations

A fictional manuscript predicts that visible feedback increases contribution. Its paragraph lists studies on motivation, reputation, and participation without explaining how the feedback changes a contributor’s decision. The citations may concern different constructs and settings.


### 35.1 Literature grouping

Group literature by ideas, assumptions, mechanisms, or methodological differences relevant to the argument. Chronology is useful when development matters. Avoid arbitrary categories that make the proposed study appear unique by construction.


### 35.2 Definitions

Define central terms before using them in relationships or hypotheses. A definition should clarify inclusion, exclusion, and level. Keep everyday synonyms from silently replacing constructs with different theoretical meanings.


### 35.3 Assumptions

Assumptions connect the theory to the setting and make the prediction possible. State consequential assumptions about actors, information, incentives, and time. Readers should be able to identify what would happen if an assumption failed.


### 35.4 Causal logic

Causal logic explains a generative sequence or dependency under specified conditions. Write the steps rather than merely drawing an arrow. Even when the empirical study cannot identify causality, distinguish the proposed theory from the evidence actually obtained.


### 35.5 Alternatives

Alternative theories may predict the same outcome for different reasons. Explain where their implications diverge and whether the design can discriminate. Do not claim a theory is confirmed merely because its prediction is compatible with the result.


### 35.6 Hypotheses or propositions

Hypotheses and propositions should state clear relationships at the intended level and scope. Their number should follow the argument. Avoid creating many loosely motivated tests simply because variables are available.


### 35.7 Contribution positioning

Position the contribution relative to the closest explanations, not only a broad research label. State what is retained, revised, or newly connected. Recognizing continuity can make a contribution more credible than overstating a complete break.


### Returning to the example: reasoning and lesson

Specify the proposed steps: what becomes visible, how actors interpret it, which incentive or belief changes, and why contribution follows under stated conditions. Use sources to support those links where appropriate and consider contrary paths. The lesson is that citations document an argument; they do not replace its reasoning.


### Reviewer lens

Why should the relationship hold, and when might it not?


### Exercise and deliverable

Produce a theory paragraph with explicit reasoning and rival explanations.


## Chapter 36: Writing methods, findings, and discussion

Methods let readers evaluate how evidence was produced; findings show what was learned; discussion interprets its consequences. These sections must remain connected without repeating one another or strengthening claims beyond the design. Explicit limitations help readers understand the scope of the contribution.


### Learning objective

Report the study transparently and interpret its contribution proportionately.


### Opening example 36 (hypothetical): From association to an overextended recommendation

A fictional cross-sectional survey finds that employees reporting greater system use also report higher productivity. The discussion recommends mandating use to raise productivity. The design has not separated selection into use from the consequences of use, and both responses come from the same occasion.


### 36.1 Design rationale

A design rationale explains why the evidence strategy fits the question and alternatives were not chosen. Describe constraints honestly. Using a familiar method or a large available dataset is not sufficient justification by itself.


### 36.2 Procedural detail

Procedural detail should enable readers to reconstruct consequential steps: recruitment, exclusions, timing, measures, coding, and analysis. Separate what was planned from what occurred. Missing details can prevent evaluation even when the analysis is sound.


### 36.3 Quantitative and qualitative reporting

Quantitative reporting needs interpretable estimates and uncertainty; qualitative reporting needs a transparent connection between material and interpretation. Both require context and contrary evidence. Apply the appropriate tradition’s standards rather than treating one format as universally superior.


### 36.4 Interpretation

Interpretation explains what a result means for the question while accounting for alternative explanations and uncertainty. Separate statistical description from theoretical inference. A surprising result may motivate a new explanation without already validating it.


### 36.5 Theoretical implications

Theoretical implications identify how the findings alter an existing concept, relationship, process, or boundary. State the previous understanding explicitly. Repeating that results support theory adds little unless the support resolves a consequential uncertainty.


### 36.6 Practical implications

Practical implications connect evidence to a decision under realistic constraints. Specify the decision maker, available action, relevant outcome, and limits. An observational association may inform attention or further testing without supporting an intervention recommendation.


### 36.7 Limitations

Limitations explain how specific shortcomings affect specific claims. Pair each with the evidence that remains informative and a feasible next study. Generic statements about sample size or geography are less useful than identifying the inferential consequence.


### Returning to the example: reasoning and lesson

Report the association and explain plausible alternatives. A recommendation for compulsory use would need evidence about that intervention and its consequences, not just the observed relationship. The discussion can identify a question for further study without pretending to answer it. The lesson is to calibrate practical implications to the design.


### Reviewer lens

Can each implication be traced to a warranted inference?


### Exercise and deliverable

Deliver a findings-to-discussion crosswalk.


## Chapter 37: Figures, tables, references, and language

The argument also travels through tables, figures, references, and wording. This chapter treats presentation as part of evidential clarity. A display should reveal the comparison and uncertainty, and the text should preserve the same units and scope.


### Learning objective

Communicate precisely and make the manuscript internally consistent.


### Opening example 37 (hypothetical): The missing denominator

A fictional chart shows that one platform group produces more helpful answers than another. It displays counts but omits the number of opportunities to answer and the number of contributors. The author interprets the taller bar as greater willingness to help.


### 37.1 Figure purpose

A figure should answer a recognizable question: comparison, trend, distribution, process, or relationship. Choose the visual form accordingly. Decorative complexity can distract from the uncertainty or contrast that the reader needs to evaluate.


### 37.2 Axes and uncertainty

Axes specify scales and reference points; uncertainty displays specify what variability is represented. Label units, transformations, and interval meaning. A truncated axis or selective time range can exaggerate an otherwise correctly computed result.


### 37.3 Table notes

Table notes should define samples, variables, units, models, uncertainty procedures, and relevant exclusions. Make the comparison recoverable without guesswork. A table with many stars but unclear denominators is not self-contained.


### 37.4 Accessibility

Accessible presentation uses readable text, distinguishable symbols, adequate contrast, and non-color cues where needed. Check the final exported size, not only an enlarged editing window. Accessibility improves scrutiny as well as inclusion.


### 37.5 Terminology

Terminology should remain stable across prose, tables, equations, and code documentation. Define necessary abbreviations once and avoid casual substitutes for technical constructs. A glossary helps only if the manuscript actually follows it.


### 37.6 Citation fidelity

Citation fidelity requires that the cited source actually supports the attributed claim and that its qualifications are retained. Verify relevant passages, not just bibliographic existence. Distinguish a source’s finding from the current author’s extrapolation.


### 37.7 Bilingual equivalence

Bilingual equivalence preserves concepts, scope, uncertainty, and argumentative force. Chinese support for a claim should not become English proof of it. Check negation, causal verbs, population restrictions, and numerical units in both versions.


### Returning to the example: reasoning and lesson

The count could reflect group size or opportunity rather than willingness. Decide which question is intended, present the relevant denominator, and avoid attributing motivation without evidence. Counts may be appropriate for total contribution, while rates answer another question. The lesson is to make the display’s unit and comparison visible.


### Reviewer lens

Does presentation help readers assess the evidence rather than exaggerate it?


### Exercise and deliverable

Create a manuscript consistency audit and revise one figure.


## Chapter 38: Reviewer judgment and editorial decisions

A manuscript enters a conversation with readers who may disagree about importance, evidence, or fit. This chapter examines how such judgments can be understood and evaluated. Separate a consequential objection from a personal preference while remaining open to problems your own framing obscures.


### Learning objective

Understand reasoned evaluation and legitimate differences in taste.


### Opening example 38 (hypothetical): Disagreement about a narrow contribution

Two fictional reviewers assess a carefully executed study of a small interface change. One values the clean evidence; the other asks what broader understanding changes. Their comments are invented for teaching and are not attributed to an actual editor or journal.


### 38.1 Importance

Importance concerns the consequence of resolving the question, not simply the popularity of its topic. Ask which understanding changes and for whom. An elegant answer to a trivial uncertainty may remain a limited contribution.


### 38.2 Novelty

Novelty is relative to existing knowledge and must be assessed against the closest work. A new label may rename an old mechanism. Explain the substantive difference and whether it matters rather than relying on first-study language.


### 38.3 Rigor

Rigor means the inquiry is conducted and interpreted appropriately for its purpose and tradition. It includes conceptual and evidential discipline, not only technical complexity. A simpler design can provide a more convincing answer than a sophisticated mismatched model.


### 38.4 Fit

Fit concerns the venue and audience’s intellectual needs, while quality concerns the contribution’s merits. A sound paper can be a poor fit. Avoid treating every rejection as evidence that the study is worthless or every acceptance as final truth.


### 38.5 Contribution types

Different contribution types need different evidence: conceptual clarity, causal identification, predictive validation, interpretive grounding, or artifact evaluation. Make the evaluation standard explicit. Applying an irrelevant standard can produce an apparently rigorous but unfair review.


### 38.6 Fatal and repairable concerns

A fatal concern prevents the current evidence from supporting the central claim; a repairable concern can be addressed within a feasible revision. This distinction depends on scope and access. Explain the repair path instead of labeling every weakness fatal.


### 38.7 Editorial synthesis

Editorial synthesis integrates reviewers’ reasons and the paper’s potential rather than averaging recommendations mechanically. Authors should respond to the central intellectual concerns. Conflicting reviews may reveal distinct priorities that require an explicit tradeoff.


### 38.8 Uncertainty

Review judgments are made under uncertainty and may reasonably differ. Distinguish a demonstrable error from a preference or unresolved theoretical disagreement. A constructive review states confidence, reasons, and what evidence could change the judgment.


### Returning to the example: reasoning and lesson

The authors should identify the knowledge claim and its scope, not assume that either rigor or breadth automatically wins. A narrow result may be valuable if it resolves a consequential uncertainty; an inflated theory claim is not a repair. The lesson is to diagnose the substance of disagreement before guessing at reviewer taste.


### Reviewer lens

Which concerns are methodological, interpretive, venue-specific, or personal?


### Exercise and deliverable

Write two defensible reviews and an editorial decision rationale.


## Chapter 39: Revisions, rebuttals, and rejection

Review becomes useful through substantive revision. This chapter translates comments into problems, evidence needs, and feasible repairs. A persuasive response makes the change inspectable and acknowledges requests that cannot honestly be fulfilled with the available design or data.


### Learning objective

Translate criticism into substantive decisions and traceable changes.


### Opening example 39 (hypothetical): A mechanism request the data cannot answer

A fictional review asks authors to show that an observed platform effect operates through perceived fairness. The existing logs record actions but contain no valid fairness measure. The authors can conduct additional work, narrow the claim, or explain the limitation; they cannot create evidence by renaming a behavioral variable.


### 39.1 Comment decomposition

Decompose a comment into the underlying concern, requested action, and desired evidential outcome. A request for another analysis may express a deeper measurement problem. Address the concern before deciding whether the exact requested procedure is suitable.


### 39.2 Prioritization

Prioritize changes by their impact on the central claim and dependencies among repairs. Correcting a construct may require revising measures, analyses, and prose. Polishing the introduction first can waste effort if the design later changes the contribution.


### 39.3 New evidence

New evidence should answer a defined concern and be generated under a defensible procedure. State whether it was requested after reviewing existing results. Avoid collecting additional observations only until a preferred significance threshold is reached.


### 39.4 Redesign

Redesign can change the comparison, measurement, sampling, or even research question. Explain what remains comparable to the original study and what becomes a new study. A major redesign cannot be represented honestly as a cosmetic robustness check.


### 39.5 Claim reduction

Reducing a claim aligns interpretation with evidence and can strengthen credibility. Replace an unsupported causal or mechanism statement with the strongest justified alternative. The remaining contribution must still be explained rather than hidden behind vague wording.


### 39.6 Response letters

A response letter links each concern to a direct answer, evidence, and manuscript location. Distinguish completed changes from promised future work. Politeness matters, but it cannot substitute for resolving the issue or explaining a justified disagreement.


### 39.7 Resubmission strategy

After rejection, reassess the study’s central weaknesses before changing venues. A new audience may improve fit, but unresolved design problems travel with the manuscript. Record which critiques remain relevant and how the revised contribution differs.


### Returning to the example: reasoning and lesson

A substantive response states what the current design establishes, why the requested inference is unavailable, and what repair is feasible. If new evidence is collected, explain its relationship to the original study. The lesson is to answer the underlying concern honestly rather than satisfy the wording with an unsupported proxy.


### Reviewer lens

Did the response solve the underlying concern or merely change wording?


### Exercise and deliverable

Deliver a revision matrix with completed, partial, and unresolved items.


## Chapter 40: Presentations, defenses, and research dialogue

Oral research dialogue compresses the same argument under time pressure. The task is to preserve the reasoning while adapting detail to the audience. Questions are opportunities to locate disagreement, clarify assumptions, and decide what evidence would resolve an issue.


### Learning objective

Adapt the same research to distinct audiences and discussion goals.


### Opening example 40 (hypothetical): Explaining the same identification problem twice

A fictional presentation examines participation before and after a platform policy. Novice listeners ask why the change is not enough to prove an effect; specialist listeners ask what supports the comparison group. The speaker needs to explain the same limitation at different levels of detail.


### 40.1 Elevator pitch

An elevator pitch states the question, why it matters, and the main learning in accessible language. It invites further discussion rather than compressing every method. Prepare a version that remains accurate when technical qualifications are shortened.


### 40.2 Seminar

A seminar allows extended scrutiny of reasoning and evidence. Allocate time to the decisions most likely to determine credibility. Anticipate alternative explanations and keep supporting detail available without overwhelming the main presentation.


### 40.3 Conference talk

A conference talk requires a sharply selected argument suited to the allotted time and audience. State what the design can establish early. Rehearse transitions and remove material rather than accelerating through unreadable slides.


### 40.4 Poster

A poster supports nonsequential conversation. Make the central question, evidence, and takeaway discoverable independently. Prepare short explanations for different entry points because viewers may begin with a figure rather than the title.


### 40.5 Dissertation defense

A dissertation defense evaluates ownership of the research and understanding of choices and limits. Practice explaining why alternatives were not selected and what new evidence would change the conclusion. Memorizing answers cannot replace that understanding.


### 40.6 Job talk

A job talk introduces a research contribution and the scholar’s developing agenda. Connect the focal study to future questions without overselling unfinished work. Adapt background to a department audience broader than the immediate specialty.


### 40.7 Handling questions

When answering questions, identify whether the issue concerns facts, assumptions, interpretation, or scope. Answer directly, acknowledge genuine uncertainty, and offer a specific way to investigate it. Do not invent results to protect the presentation’s momentum.


### Returning to the example: reasoning and lesson

For novices, explain that other things may have changed at the same time. For specialists, state the comparison, identifying assumptions, timing, and relevant diagnostics. Neither audience needs a stronger claim than the evidence supports. The lesson is to adapt the explanation while preserving the inferential content.


### Reviewer lens

Does the speaker understand the work beyond prepared slides?


### Exercise and deliverable

Prepare three talk outlines and a question-evidence response bank.


# Volume 6: Independent research and AI collaboration

The final volume connects sound individual decisions into sustainable research practice. It covers project choices, collaboration, AI assistance, reusable knowledge, and a cumulative agenda before asking you to complete and evaluate an integrated project. Independence means knowing when to proceed, when to revise, and when more evidence or expertise is needed.

AI


## Chapter 41: Research projects and decision records

The final volume examines how to sustain this work. A project needs decisions, dependencies, and a record of why choices were made. Manage progress by what becomes known or feasible, including justified decisions to stop a line of inquiry.


### Learning objective

Manage research as uncertain knowledge work.


### Opening example 41 (hypothetical): A pilot reveals a measurement failure

A fictional pilot asks employees to estimate time spent checking AI-generated drafts. Responses are inconsistent because employees combine checking with rewriting. The planned outcome cannot yet separate these activities, and the team has limited time for additional collection.

AI


### 41.1 Milestones

Milestones should mark learning or validated capability, such as establishing a usable measure or obtaining field access. Define observable completion evidence. A date labeled finish analysis is too vague to manage dependencies or detect a blocked design.


### 41.2 Dependencies

Dependencies identify what must be settled before another action becomes meaningful. Measure validation can precede interpretation, while parallel literature work may continue. Make dependencies explicit to avoid producing polished claims on unstable foundations.


### 41.3 Budgets

Budgets include time, money, participant burden, access, and computation. Allocate some resources to failure and revision. An expensive analysis is justified by information gained, not by the impression that complexity signals rigor.


### 41.4 Decision logs

Decision logs record options, evidence, rationale, timing, and consequences. They help reconstruct why a project changed and whether outcomes were known at the time. Keep them concise enough to maintain throughout the project.


### 41.5 Failure criteria

Failure criteria describe when a proposed approach cannot answer its intended question. Examples include unusable measurement or absent comparison support. A null result is not necessarily design failure, and a significant result is not proof of design success.


### 41.6 Project portfolios

A project portfolio balances learning horizons, dependencies, and risks across studies. Avoid starting so many projects that none receives sustained attention. Complementarity matters more than having several unrelated fashionable topics on a list.


### 41.7 Stopping and pivoting

Stopping or pivoting should follow evidence about value and feasibility rather than embarrassment about sunk effort. Preserve reusable knowledge and document what failed. A pivot becomes a new plan whose assumptions need examination.


### Returning to the example: reasoning and lesson

The decision is whether to improve observation, redefine the outcome, or narrow the question. Record what each option permits and sacrifices, along with cost and timing. Continuing the original analysis would not resolve the ambiguity. The lesson is that a justified redesign can be progress even when it delays estimation.


### Reviewer lens

Are next steps justified by learning rather than sunk costs?


### Exercise and deliverable

Deliver a project charter and milestone decision table.


## Chapter 42: Advising, collaboration, and authorship

Research is often collaborative, so judgments must be explained across different expertise and responsibilities. This chapter connects communication, contribution, credit, and disagreement. Clarifying roles early makes it easier to distinguish an intellectual conflict from a coordination failure.


### Learning objective

Develop clear expectations and responsible collaboration.


### Opening example 42 (hypothetical): Two collaborators interpret an engagement result

In a fictional team, a methods collaborator reports that an estimate is robust to several specifications. A domain collaborator argues that the engagement measure combines help-seeking with productive contribution. They disagree about what the paper can conclude, not necessarily about whether the code runs.


### 42.1 Roles

Roles clarify who handles conceptual development, access, implementation, interpretation, and coordination. Roles can evolve, but responsibilities should remain visible. Technical contribution and intellectual contribution may overlap and should not be reduced to job titles.


### 42.2 Feedback

Feedback is most useful when tied to a question and a concrete artifact. Send the decision needing help, evidence already gathered, and proposed options. Asking whether everything looks good tends to produce vague responses.


### 42.3 Disagreement

Disagreement may concern values, definitions, evidence, assumptions, or tactics. Identify its source before seeking consensus. A documented unresolved disagreement can guide additional inquiry; silent compliance followed by different private action undermines collaboration.


### 42.4 Contribution records

Contribution records document substantive work over time and help clarify responsibilities and recognition. They should support transparent discussion rather than become a simplistic point system. Revisit contributions when the project changes materially.


### 42.5 Authorship discussions

Authorship discussions should occur early and be revisited as contributions evolve under applicable disciplinary and institutional expectations. Distinguish acknowledgment from authorship and clarify responsibility for the final work. Current policies require separate verification when used operationally.


### 42.6 Data access

Collaboration does not automatically authorize unrestricted sharing of data. Specify access levels, permitted uses, storage, and what happens when members leave. A convenient transfer can violate the conditions under which data were obtained.


### 42.7 Conflict resolution

Conflict resolution begins with a specific description of the disagreement and prior agreements. Seek a fair process, appropriate mediation when needed, and preservation of research integrity. Avoid allowing interpersonal pressure to determine the reported evidence.


### Returning to the example: reasoning and lesson

Separate the statistical claim from the construct interpretation. Agree on the target concept, inspect how activities are recorded, and decide whether disaggregation or a narrower claim is possible. Expertise is complementary when each concern is made explicit. The lesson is to resolve the decision through evidence rather than status or disciplinary ownership.


### Reviewer lens

Are contributions and responsibilities transparent?


### Exercise and deliverable

Prepare a meeting brief and collaboration agreement topics.


## Chapter 43: AI-assisted research workflows

AI assistance adds a new collaborator-like interface but does not remove the researcher’s responsibility for claims. Define tasks, inputs, permitted actions, and verification before relying on an output. This chapter focuses on making assistance inspectable within the research process.

AI


### Learning objective

Delegate bounded tasks while retaining accountable research judgment.


### Opening example 43 (hypothetical): An assistant audits a table

A researcher gives an AI assistant an existing table and analysis output, asking it to locate discrepancies. The assistant is allowed to read and report but has not been authorized to change the dataset or rerun alternative models. This is a hypothetical task specification, not an instruction to modify this project.

AI


### 43.1 Task specifications

A task specification states the goal, inputs, scope, constraints, expected output, and acceptance evidence. Separate reading or diagnosis from permission to modify artifacts. An assistant cannot infer authorization for unrelated actions from a broad research ambition.


### 43.2 Context

Context supplies definitions, prior decisions, authoritative files, and unresolved uncertainties relevant to the task. More text is not always better. Provide enough context to avoid incorrect assumptions while keeping source authority and version clear.


### 43.3 Tool boundaries

Tool boundaries specify what an assistant may access, change, execute, or communicate. Distinguish technical capability from authorization. Keep consequential actions reviewable and ensure that external content is treated as evidence rather than as permission.


### 43.4 Verification

Verification checks an output against evidence independent of its generation where feasible. Hand calculations, held-out examples, source passages, and reproducible runs serve different purposes. Asking the same model whether it is correct is not equivalent to independent validation.


### 43.5 Source checks

Source checks verify both bibliographic identity and the passage supporting an assertion. Require traceable links and distinguish retrieved facts from model inference. Fluent summaries can conceal fabricated or misattributed evidence.


### 43.6 Human decisions

Human decisions remain necessary for research priorities, contested interpretation, scope changes, and responsibility. An assistant can lay out options and evidence. Approval of one action does not imply acceptance of every inferred conclusion or future modification.


### 43.7 Stopping conditions

Stopping conditions identify completed acceptance criteria, repeated unresolved failures, or decisions requiring the researcher. Persistent work should reduce uncertainty, not cycle through cosmetic revisions. Report what is verified, provisional, and blocked separately.


### Returning to the example: reasoning and lesson

A useful output identifies each discrepancy, its source location, and the uncertainty about its cause. Repairs should follow the authorized scope and be verified against the intended analysis. The lesson is to separate finding a problem, proposing a repair, and executing it; fluent output does not establish that any of those steps was completed correctly.


### Reviewer lens

What was verified independently, and what remains model-generated?


### Exercise and deliverable

Deliver a task brief with inputs, permissions, acceptance criteria, and verification evidence.


## Chapter 44: AI as object, instrument, and participant

The same AI system can be studied, used to measure something, or asked to simulate a participant. These roles create different evidential problems. Returning to Chapter 2, keep the technology’s role explicit so that one type of validation is not mistaken for another.

AI2


### Learning objective

Separate distinct scientific roles and associated validity questions.


### Opening example 44 (hypothetical): Humans responding to AI versus AI simulating humans

One fictional study randomly shows human participants advice attributed to AI. Another prompts a language model to produce responses as if it were those participants. The second is cheaper to run, but its generated responses are not observations of the human population in the first study.

AI


### 44.1 Model versions

Model identity should include consequential version and configuration information, not merely a product family. Changes can alter behavior between data collection waves. State what was observed at collection time and avoid claiming stability without evidence.


### 44.2 Prompts

Prompts are part of a measurement or intervention protocol and can change what is elicited. Document roles, examples, ordering, and output rules where relevant. Prompt optimization on evaluation cases can invalidate an intended independent assessment.


### 44.3 Stochasticity

Stochasticity creates variation across runs even with identical apparent inputs. Define whether the target is a single response, expected behavior, or a response distribution. Repeated outputs from one model are not independent human participants.


### 44.4 Synthetic respondents

Synthetic respondents are generated responses under a model and prompting process. Their resemblance to selected human averages does not establish population validity. Test the specific use case and retain the distinction between simulation and observations of people.


### 44.5 Human validation

Human validation compares outputs with relevant human evidence under an explicit protocol. Use appropriate samples, independent judgments, and meaningful errors. Agreement on easy examples does not establish validity for difficult or socially consequential cases.


### 44.6 Contamination

Contamination occurs when evaluation material or close variants have influenced model development, selection, or prompting. Public benchmarks can be vulnerable. Explain what can be ruled out and what remains unknown rather than claiming uncontaminated evaluation without access.


### 44.7 Tool use

Tool use changes the system being evaluated by adding retrieval, actions, memory, or execution. Specify the available tools and interaction limits. A model answering a static prompt should not automatically be described as an autonomous operational agent.


### 44.8 Reproducibility

AI reproducibility requires prompts, model details, outputs, evaluation rules, and relevant environment records. Some hosted systems cannot be recreated exactly. Report reproducible procedures separately from guaranteed identical outputs.

AI


### Returning to the example: reasoning and lesson

The generated responses may help explore a model’s behavior or develop candidate materials. Treating them as evidence about people requires a separately justified and validated relationship to the target population and task. The lesson is that simulation changes the source of evidence; it does not simply accelerate the same human study.


### Reviewer lens

Which population or process do the outputs actually represent?


### Exercise and deliverable

Create an AI-study specification and a validity threat register.

AI


## Chapter 45: Knowledge management and reusable skills

Experience becomes reusable when its reasoning, sources, and limits are preserved. This chapter explains how notes and skills can support future work without turning past choices into unquestioned rules. Reuse should retain context and make conflicts visible.


### Learning objective

Build reusable research resources with clear provenance.


### Opening example 45 (hypothetical): Two instructions with the same name

A fictional researcher has two saved skills called “review.” One checks prose and citations; the other proposes changes to analysis code. The current task is to comment on an argument without modifying files. Choosing by the shared name alone would leave the permitted actions unclear.

review


### 45.1 Literature libraries

A literature library should preserve identifiers, versions, notes, and the reason a source matters. Separate imported metadata from verified claims. A large collection without retrieval logic can make research slower rather than more cumulative.


### 45.2 Concept notes

Concept notes connect definitions, disagreements, examples, and uses across papers. Keep the source of each interpretation visible. A note should help compare ideas, not simply merge incompatible definitions into a convenient sentence.


### 45.3 Project archives

Project archives preserve authoritative data, code, drafts, decisions, and outputs with clear statuses. Distinguish final, exploratory, superseded, and failed artifacts. File names alone are insufficient if the provenance connecting them is lost.


### 45.4 Skill routing

Skill routing chooses the relevant workflow based on the task’s actual needs. Read only the required modules and identify duplicate implementations by source. A universal instruction to use every skill wastes context and can introduce incompatible assumptions.


### 45.5 Source versions

Source versions matter when advice, data, or software changes. Record access dates or immutable versions where possible and identify claims needing refresh. Historical guidance should not be silently presented as a current operational requirement.


### 45.6 Dependency management

Dependencies include packages, external services, data formats, and assumptions inherited from other workflows. Record what failure of each dependency would invalidate. A copied script may run while silently relying on a different unit or data definition.


### 45.7 Licensing

Reuse conditions vary across code, datasets, text, and figures. Check licenses and permissions before redistributing material. Citation acknowledges a source but does not by itself establish permission to reproduce it in full.


### Returning to the example: reasoning and lesson

Inspect the source, scope, assumptions, and required inputs of each instruction. Use the version appropriate to the task and record consequential choices. A reusable skill should preserve why a step is needed and when it does not apply. The lesson is to retain provenance and context rather than accumulate interchangeable-looking commands.


### Reviewer lens

Is a workflow justified and maintained, or copied without scrutiny?


### Exercise and deliverable

Deliver a source-to-capability registry and a maintenance rule.


## Chapter 46: Building a research agenda

An independent agenda connects projects through a continuing intellectual concern. Instead of accumulating unrelated topics, identify what each study teaches and which unresolved question follows. Coherence does not require repeating one method or protecting one theory from criticism.


### Learning objective

Connect projects through a durable intellectual question.


### Opening example 46 (hypothetical): Connecting projects through a continuing question

Imagine a researcher interested in how platforms distribute responsibility for content quality. One project examines contributor incentives, another follows moderation routines, and a third evaluates an interface for reporting uncertain information. They use different methods but can address related parts of the same concern.


### 46.1 Programmatic inquiry

Programmatic inquiry develops a durable question across related studies. Identify what each study resolves and what it leaves open. A research program can evolve, but continuity should be intellectual rather than merely reuse of the same dataset.


### 46.2 Complementary studies

Complementary studies address different uncertainties through different designs, contexts, or levels. Explain the joint inference without pretending weaknesses automatically cancel. Several studies repeating the same measurement flaw do not create stronger validity.


### 46.3 Accumulation

Accumulation requires comparable concepts, documented differences, and explicit updates to prior knowledge. Repeated publication alone is not cumulative progress. Record when a new study supports, narrows, contradicts, or reframes an earlier claim.


### 46.4 Transfer

Transfer asks whether an insight remains useful in a different setting and why. Identify the mechanism or design condition that should travel. Repeating a procedure elsewhere without checking its assumptions tests a different question than justified transfer.


### 46.5 Intellectual identity

An intellectual identity explains the questions and perspectives connecting a researcher’s work. It should remain open to learning rather than become a brand that forbids contrary results. Describe the contribution sought, not only favored methods.


### 46.6 Collaboration strategy

Collaboration strategy identifies complementary expertise and genuine shared questions. Clarify what each partnership enables and how decisions will be made. Adding prestigious names is not a substitute for the capabilities the research actually needs.


### Returning to the example: reasoning and lesson

An agenda explains the intellectual connection and what each project adds or challenges. It should also permit a result to change the next question. A common technology label alone would provide a weaker connection. The lesson is to build cumulative learning without requiring every study to confirm the same favored explanation.


### Reviewer lens

Does the agenda deepen understanding or merely repeat a setting?


### Exercise and deliverable

Write a three-project agenda with distinct contributions and shared questions.


## Chapter 47: Integrated capstone project

The capstone combines the book’s decisions in one bounded project. Choose a case, formulate a question, justify a design, and show how evidence would support a claim. The goal is an internally coherent research package whose weaknesses can be examined, not an artificial promise of a publishable result.


### Learning objective

Integrate the handbook into a coherent study proposal and pilot.


### Opening example 47 (hypothetical): A bounded capstone on community participation

For this hypothetical capstone, choose Case A: a question-and-answer community changes content visibility. You are given a documented synthetic dataset with posting and response times, but no direct measure of why members act. No real policy effect is assumed. The task is to develop a coherent research package from these constraints.

A


### 47.1 Phenomenon

Begin the capstone with a documented phenomenon and several plausible puzzles. Separate observations from assumptions. The first deliverable should make it possible for another reader to understand why the selected uncertainty deserves investigation.


### 47.2 Literature

Build a literature map that identifies closest studies, disagreements, and missing knowledge. Verify all cited claims. The capstone should demonstrate the ability to revise its question after reading rather than selectively collecting supportive references.


### 47.3 Theory

Specify concepts and a reasoned account of the phenomenon appropriate to the chosen tradition. Include rival explanations or interpretive alternatives. State which theoretical claims are provisional and what observations could challenge them.


### 47.4 Design

Choose a feasible evidence strategy and justify it against at least one serious alternative. Define units, sampling, measurement, timing, and ethical requirements. The design must be assessed before data analysis begins.


### 47.5 Pilot

Run a pilot to test the design’s weakest practical and measurement links. Record failures and changes. Do not treat pilot results as definitive findings when the pilot was designed only to assess feasibility.


### 47.6 Analysis

Execute the selected analysis or interpretation with traceable inputs and decisions. Verify key calculations or evidence links independently where feasible. Explain how unexpected findings change the argument without erasing their exploratory origin.


### 47.7 Limitations

Prepare a limitations ledger linking each unresolved issue to affected claims. Distinguish uncertainty that can be reduced from unavoidable scope. Propose a realistic next study rather than a generic call for more data.


### 47.8 Writing

Write a paper that makes the question, contribution, evidence, and boundaries visible. Use the bilingual version as an additional consistency check. Preserve the distinction between planned work, executed work, and validated findings.


### 47.9 Defense

Defend the capstone through questions about its most consequential decisions. Present an alternative design and explain the tradeoff. Revise the dossier after criticism; successful defense includes learning, not merely resisting every objection.


### Returning to the example: reasoning and lesson

Define a question, an outcome window, a sample, and the comparison or descriptive analysis the evidence permits. State what additional evidence would be required for a mechanism claim. Submit a claim–evidence–limitation record with the analysis plan. The lesson is integration: all choices must support the same question, even if that question becomes narrower than first imagined.


### Reviewer lens

Can the student defend the most consequential choices and revise weak ones?


### Exercise and deliverable

Deliver a research dossier, pilot report, draft paper, and oral defense.


## Chapter 48: Assessing independent research competence

The final question is whether you can transfer the reasoning beyond a familiar exercise. Independent competence means explaining consequential choices, recognizing failure, and revising responsibly when evidence changes. Use this chapter to identify the next learning need rather than declare that research judgment is finished.


### Learning objective

Use feedback to identify the next learning frontier.


### Opening example 48 (hypothetical): Transferring judgment to an unfamiliar study

A fictional student who has practiced platform research receives a study of a hospital coordination application. The new setting resembles Case H, but the student is told only that messages were delivered faster after introduction. The student must assess the claim without assuming the earlier teaching story actually occurred.

H


### 48.1 Transfer to unfamiliar settings

Transfer assessment uses an unfamiliar phenomenon so memorized examples are insufficient. Ask the learner to identify units, concepts, evidence needs, and a plausible design. Evaluate the reasoning process as well as the final choice.


### 48.2 Critique

Competent critique reconstructs an argument fairly, locates consequential weaknesses, and proposes proportionate remedies. It distinguishes unsupported claims from merely unfamiliar approaches. A long list of minor objections is not necessarily a strong review.


### 48.3 Uncertainty

Handling uncertainty means stating what is known, inferred, and unresolved, then choosing informative next actions. Neither overconfidence nor permanent indecision is desirable. Assess whether additional evidence changes the learner’s judgment appropriately.


### 48.4 Reproducibility

Reproducibility competence includes rebuilding results, tracing discrepancies, and understanding access limits. Mechanical rerunning is insufficient when the analyst cannot explain the target quantity or measurement. Test both execution and interpretation.


### 48.5 Intellectual independence

Intellectual independence is the ability to justify and revise consequential choices while using others’ expertise responsibly. It does not mean working alone or rejecting advice. Assess whether the researcher can identify when consultation is necessary.


### 48.6 Ongoing development

Ongoing development uses a portfolio of work and feedback to identify the next specific capability to build. Reassess over time and across tasks. No reading certificate or fixed score establishes universal readiness for every top-level research problem.


### Returning to the example: reasoning and lesson

A strong response asks what was measured, who was observed, what else changed, and which outcome the claim concerns. It distinguishes faster delivery from better coordination and proposes feasible evidence for the next question. The lesson is transfer of reasoning rather than memorization of an example’s conclusion; independence includes recognizing when domain expertise is needed.


### Reviewer lens

Can the student reason beyond memorized templates?


### Exercise and deliverable

Complete a competence portfolio and targeted development plan.


# Extended workshops and discipline map


## W1. Choosing a worthwhile topic

Workshop setting (hypothetical). Four students are choosing projects, with different kinds of access. One has only a broad interest in AI and employee productivity; one can observe employees maintaining a legacy system; one has global before-and-after trends but no defensible comparison for an AI release; one can randomize an interface feature in a defined task. We compare the reasoning behind their topic choices, not the prestige of their domains.

AIAI

A topic is a space of possible inquiry, not a finished contribution. Evaluate a topic by the consequential uncertainty it contains, the intellectual conversation it enters, the role of digital technology, and the possibility of obtaining informative evidence. Popularity can create access and interest, but it can also produce crowded questions and unstable terminology. The aim is to find a question worth answering with a credible path to an answer.

Use seven separate judgments instead of a single weighted score: importance, unresolved knowledge, IS relevance, conceptual clarity, evidence feasibility, personal and collaborative capability, and future learning potential. Do not allow high excitement to compensate numerically for impossible identification or an undefined construct. A decisive weakness can require redesign even when the other dimensions look strong.

IS

**Diagnostic questions:** What is uncertain? Who would learn something consequential? Which existing explanation is insufficient? Why is the technology central to the phenomenon? What evidence could distinguish alternative answers? What would a credible null or contradictory result teach? Which assumption makes this project most fragile? Why are you positioned to investigate it responsibly?

Consider four teaching examples. A popular topic with a weak question asks whether any AI tool improves any employee’s productivity. A less fashionable but potentially valuable question asks how legacy-system workarounds preserve essential organizational knowledge. An important but currently infeasible causal question asks how a worldwide AI release affected all knowledge work without a usable counterfactual. A feasible narrower question asks how a specified interface change affects a defined task under randomized assignment. These examples illustrate evaluation; they are not claims of established novelty.

AIAI

A good topic decision ends with a memo containing: the phenomenon and evidence for it; the closest knowledge; the unresolved uncertainty; two plausible contributions; the weakest feasibility link; a small pilot; and a decision date. The pilot should reduce uncertainty about whether the study can teach something, not screen topics for a favorable p-value. Record why an attractive alternative was postponed.

p


## W2. Developing an RQ through successive repairs

Workshop setting (hypothetical, related to Case B). A student can study a customer-support team whose employees receive AI-generated draft responses. Employees may accept, edit, or reject the drafts and remain responsible for sending the final reply. Preliminary conversations suggest that some apparently useful drafts are rejected, but the student has not yet verified the pattern, its extent, or its causes. The stages below show how to develop a question without treating those impressions as findings.

BAI

**Stage 1: Interest.** A student begins with AI and employee performance. This names a setting and an outcome family but does not specify a technology, population, comparison, process, or uncertainty. The first repair is to document a concrete phenomenon: employees sometimes reject recommendations that appear useful. That observation still needs evidence and should not be treated as universal.

**1**AI

**Stage 2: Competing interpretations.** Rejection might reflect distrust, task expertise, perceived accountability, poor recommendation quality, or a mismatch with workflow. The student should not select trust merely because a familiar scale exists. Read the closest literature and identify which distinction is consequential and currently unresolved. Write at least one observation predicted differently by the leading explanations.

**2**

**Stage 3: Question variants.** A descriptive RQ asks how rejection varies across task types. A causal RQ asks how a specified accountability instruction changes use of otherwise comparable advice. A process RQ asks how workers develop and revise judgments about advice across repeated encounters. A design RQ asks what interface principles help workers identify when advice deserves challenge. These are different studies, not interchangeable phrasings.

**3**RQRQRQRQ

**Stage 4: Design alignment.** Suppose the student selects the causal version. Specify the assignment unit, intervention text, task, advice quality, outcome definition, and observation horizon. Decide whether the goal is an assignment effect or an effect of actual compliance. If mechanisms remain observational, retain that limitation rather than calling a correlation with trust a mechanism test.

**4**

**Stage 5: Knowledge contribution.** Ask what an increased, decreased, or null effect would imply for the argument. A study valuable only if one direction is significant is vulnerable to selective interpretation. The contribution may involve when accountability changes reliance, but that interpretation must be justified by the contrast, uncertainty, and closest prior work. This teaching RQ is illustrative and requires a novelty review before actual use.

**5**RQ


## W3. A worked measurement and inference problem

A fictional platform reports that average answers per thread increased from 2.0 to 2.5 after an AI release. A draft concludes that AI improved community collaboration. Before modeling, identify the outcome’s denominator, observation window, eligible threads, deleted content, and community composition. If older threads have longer follow-up, the comparison may mix time at risk. If low-response communities disappeared, the average may rise without any within-community improvement.

AI2.02.5AI

Even if measurement is repaired, a before–after comparison lacks an automatically valid counterfactual. A concurrent policy change could explain the pattern. An increase in answers also need not measure collaboration quality: repeated low-quality replies might increase volume. There are therefore three separate repairs: define and validate the outcome, establish an appropriate comparison for the intended inference, and limit interpretation to what the measure represents.

For a separate numerical exercise about weighting, using hypothetical counts unrelated to the preceding before–after means, suppose Community A has 90 threads with an average of 2 answers and Community B has 10 threads averaging 10 answers. The thread-weighted average is 2.8, while the equal-community average is 6. Neither is intrinsically correct for every question. The first describes the average thread in this sample; the second describes the average of community means. Changing weights is a change in the target quantity, not merely a cosmetic robustness check.

A902B10102.86

**Answer standard:** a strong response distinguishes measurement validity, composition, weighting, counterfactual identification, and the meaning of collaboration. It calculates both averages correctly and explains why neither supports the original causal sentence by itself. A weak response simply adds controls or switches standard errors while leaving the construct and comparison unchanged.


## W4. Reviewer clinic: two reasonable reviews

Workshop setting (hypothetical). Imagine a workplace field experiment assigning employees to two ways of displaying advice while holding the advice content constant. The recorded outcome is whether advice is adopted; the study has not independently evaluated the correctness of final decisions. The manuscript, reviewers, and exchange below are all invented. We use them to distinguish an objection about contribution from an objection about what an outcome measures.

A fictional manuscript presents a careful field experiment showing a small change in advice uptake. Reviewer A values the credible intervention evidence but asks whether the effect changes an important theoretical understanding. Reviewer B values the practical question but questions whether uptake measures improved decision quality. Both objections can be legitimate and neither is answered by citing the sample size alone.

AB

The author should separate the concerns. For A, compare the result with a specific prior expectation and explain what uncertainty is resolved. For B, examine whether decision quality was measured independently; if not, narrow the outcome claim or design a new evaluation. Changing the discussion to call uptake quality without evidence is not a repair. A smaller but defensible contribution may remain worth publishing depending on audience and scope.

AB

The teaching lesson is that reviewer taste contains both defensible priorities and contestable preferences. Ask the reviewer to identify the inferential consequence of a concern, and ask the author to provide a proportionate answer. Do not reward performative complexity, automatic acquiescence, or combative dismissal. The final judgment remains uncertain; no template guarantees acceptance.


# Research-stream atlas

This is an editorial teaching map of overlapping conversations, not an official or exhaustive taxonomy. The proposed questions below are examples for inquiry, not verified open gaps. Use MISQ Research Curations to discover related reading collections, then supplement with other journals and perspectives: .


## S01. Technology adoption, use, and continuance

Examine how people encounter, evaluate, adopt, adapt, and discontinue technologies. Distinguish intention, access, frequency, depth of use, and task performance. A possible puzzle is why adoption rises while meaningful use declines. Surveys, longitudinal records, experiments, and qualitative studies answer different parts. Begin with measurement and avoid treating all use as beneficial.


## S02. IT value, strategy, and organizational performance

Study how technology relates to productivity, capabilities, competitive position, and value distribution. Distinguish investment from capability and private returns from broader welfare. Ask which complementary organizational changes are required. Firm panels, analytical models, and case studies can be useful, but investment selection and delayed effects complicate interpretation.


## S03. Digital innovation, entrepreneurship, and transformation

Investigate how digital resources alter innovation and organizational change. Separate digitizing an existing task from changes in processes, business models, or organizing. Ask how reusable components enable experimentation yet create dependencies. Longitudinal and process designs help examine sequences; avoid measuring transformation solely by technology spending.


## S04. Platforms, ecosystems, and digital markets

Examine interactions among users, complementors, owners, and regulators. Key distinctions include participation versus value capture, governance versus technical architecture, and same-side versus cross-side effects. A possible question concerns how a rule change alters complementor investment. Network dependence, strategic response, and spillovers complicate simple individual-level comparisons.


## S05. Online communities, knowledge, and collaboration

Study contribution, learning, coordination, governance, and collective knowledge production. Distinguish volume, quality, diversity, and sustainability. More contributions may coincide with greater concentration or declining participation breadth. Combine traces with appropriate contextual evidence; silent readers and departed members can be absent from apparent community measures.


## S06. Social media, diffusion, and collective attention

Investigate how content, networks, algorithms, and social processes shape visibility and participation. Distinguish influence from similarity, exposure from persuasion, and reach from belief change. Network observation can reveal patterns but needs additional reasoning to establish contagion. Experiments and temporal designs must account for interference and platform selection.


## S07. Digital work, algorithmic management, and human–AI collaboration

Study task allocation, autonomy, expertise, monitoring, coordination, and changing occupational boundaries. Distinguish replacing a task from replacing a job. Ask who gains discretion and who bears verification work. Experiments can isolate interface effects, while process studies explain adaptation; neither automatically captures long-term organizational consequences.


## S08. AI, analytics, and decision support

Examine how systems generate, communicate, and support the use of predictions or recommendations. Distinguish model accuracy, user reliance, decision quality, and organizational value. Ask when explanations help error detection rather than merely increase acceptance. Evaluation should connect technical performance with the specific decision process without assuming one implies the other.


## S09. Privacy, security, trust, and digital governance

Study data practices, risk, protective behavior, accountability, and institutional arrangements. These are related but distinct conversations: concern is not behavior, trust is not security, and formal compliance is not necessarily effective protection. Research may combine experiments, organizational records, interviews, and institutional analysis. Operational legal requirements need current jurisdiction-specific verification.


## S10. Digital health, public services, and social welfare

Examine service access, coordination, professional work, outcomes, and distributional effects. Distinguish adoption from improved service and patient or citizen outcomes. Ask whether a tool helps already advantaged users more. Sensitive settings require appropriate access and ethics procedures, and indirect proxies should not be presented as direct evidence of health improvement.


## S11. Digital inequality, inclusion, and sustainability

Study uneven access, skills, participation, benefits, burdens, and environmental consequences. Access alone does not ensure effective use or equitable outcomes. Ask how design and institutional arrangements redistribute opportunities. Examine affected groups’ perspectives and the possibility that aggregate efficiency masks concentrated costs or rebound effects.


## S12. Systems development, implementation, and design science

Investigate requirements, development practices, implementation, adaptation, and the creation of useful artifacts and design knowledge. Distinguish a successful installation from sustained organizational use. Ask which design principles travel across settings. Evaluate both the artifact and the knowledge claimed about it; an implementation report alone may not establish a research contribution.


# Representative papers and researcher entry points

The following is an initial, deliberately limited reading set, not a ranking of scholars or an exhaustive canon. Author names are linked to identifiable works, not to unverified current affiliations or awards. Some entries are conceptual or methodological essays; they are not presented as empirical exemplars. Full article dissection requires further reading of methods, evidence, and appendices. The questions below are original reading prompts, not reports that the papers have passed every proposed check.


## P01. Constructs and technology acceptance

**Fred Davis (1989). Perceived Usefulness, Perceived Ease of Use, and User Acceptance of Information Technology. MIS Quarterly.**

Read how the constructs are defined and operationalized; compare beliefs with observed use and ask what supports each interpretation.


## P02. Theory and knowledge claims

**Shirley Gregor (2006). The Nature of Theory in Information Systems. MIS Quarterly.**

Use the paper to examine different purposes of theory; ask which purpose your own study serves rather than assuming all theory must take one form.


## P03. Design-science framework

**Alan R. Hevner; Salvatore T. March; Jinsoo Park; Sudha Ram (2004). Design Science in Information Systems Research. MIS Quarterly.**

Trace how artifact creation is connected to research evaluation. Identify the difference between a useful system and a supported knowledge contribution.


## P04. Interpretive evaluation

**Heinz Klein; Michael Myers (1999). A Set of Principles for Conducting and Evaluating Interpretive Field Studies in Information Systems. MIS Quarterly.**

Read the principles within their interpretive orientation; compare their reasoning with the evaluation of a randomized experiment without imposing identical standards.


## P05. Technology and organizing

**Wanda J. Orlikowski (1992). The Duality of Technology: Rethinking the Concept of Technology in Organizations. Organization Science.**

Examine how the technological object and organizational action are conceptualized. Reconstruct the argument before deciding which assumptions apply to a new digital setting.


## P06. Prediction and explanation

**Galit Shmueli; Otto R. Koppius (2011). Predictive Analytics in Information Systems Research. MIS Quarterly.**

Compare the goals and evaluation of explanatory and predictive modeling. Ask why an explanatory model’s statistical fit does not settle its predictive performance.


## P07. Network field experiment

**Ravi Bapna; Akhmed Umyarov (2015). Do Your Online Friends Make You Pay? A Randomized Field Experiment on Peer Influence in Online Social Networks. Management Science.**

Locate the assignment mechanism, outcome, and target comparison in the full paper. Evaluate what separates an influence argument from mere similarity among connected users.


## P08. Archival network research

**Anjana Susarla; Jeong-Ha Oh; Yong Tan (2012 issue; 2011 online / ****2012****2011****).**** Social Networks and the Diffusion of User-Generated Content: Evidence from YouTube. Information Systems Research.**

Use the paper to study the difficulty of separating influence, user differences, and simultaneous choices. Inspect the full identification argument rather than equating robustness language with proof.


## P09. Mixed-method design

**Viswanath Venkatesh; Sue Brown; Hillol Bala (2013). Bridging the Qualitative–Quantitative Divide: Guidelines for Conducting Mixed Methods Research in Information Systems. MIS Quarterly.**

Look for the rationale for combining methods and the point at which evidence is integrated. Distinguish a mixed-method argument from two parallel studies with no joint inference.


## P10. Analytical modeling

**Yannis Bakos; Erik Brynjolfsson (1999). Bundling Information Goods: Pricing, Profits, and Efficiency. Management Science.**

Reconstruct the assumptions about information goods and valuation before reading conclusions about bundling. Ask how changing an assumption could change the result and its practical interpretation.


## P11. Problem formulation

**Arun Rai (2017). Editor’s Comments: Avoiding Type III Errors: Formulating IS Research Problems that Matter. MIS Quarterly (editorial / ****).**

Read the distinction between answering a question rigorously and selecting a question that matters. Use the editorial as a discussion prompt rather than a universal acceptance formula.


## How to study a researcher through their work

Start with a verified paper, reconstruct its question and contribution, then trace earlier and later work addressing the same intellectual concern. Compare coauthors, methods, and changes in the argument rather than inferring a whole research identity from one article. A reading entry for a well-known author does not imply that every claim they make is beyond criticism. A complete scholar map should also include different generations, regions, traditions, and perspectives; this starter set does not yet meet that comprehensive coverage standard.


## Article anatomy worksheet

For each full reading, record: the phenomenon and its evidence; the exact RQ; the closest prior explanation; constructs and levels; why the design is appropriate; data and selection; the main comparison or interpretive procedure; decisive results or passages; competing explanations; the contribution before and after the study; scope; and what a follow-up should change. Add page or section pointers. If information is absent, record absent rather than inventing it. Separate the author’s claim, your reconstruction, and your evaluation in different fields.

RQ


## Route coverage still requiring full exemplars

The entry set provides starting points for adoption and measurement, theory, interpretive methods, design science, prediction, network experiments, archival networks, mixed methods, analytical modeling, and problem formulation. It is not a complete exemplar library for every research route. Full demonstrations of modern quasi-experimental designs, qualitative field analysis, artifact evaluation, systematic reviews, meta-analysis, and simulation should be selected and verified before those chapters are declared complete. Recent work must be added through a documented search rather than assumed from reputation.