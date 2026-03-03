(function () {
  var NODES = {
    root: {
      id: "root",
      prompt: "Pick a question to learn about Zaki:",
      options: ["role_focus", "case_studies", "ai_experience", "process", "leadership", "tools_stack", "availability_contact"]
    },
    role_focus: {
      id: "role_focus",
      question: "What kind of roles and problems does Zaki focus on?",
      answer: [
        "Senior Product Designer focused on enterprise B2B SaaS and complex, workflow-heavy systems.",
        "Specializes in legacy modernization, simplifying messy operations, and unifying fragmented user journeys.",
        "Strong fit for teams building tools for operations, regulated industries, or high-stakes decision making."
      ],
      followUps: ["strengths", "industries", "dev_background", "back_root"]
    },
    strengths: {
      id: "strengths",
      question: "What are his core strengths?",
      answer: [
        "Legacy UX modernization: turning outdated, rigid systems into usable modern experiences.",
        "Workflow unification: reducing multiple tools/paths into a single coherent flow.",
        "Discovery + alignment: workshops, synthesis, and decision support across stakeholders.",
        "AI-assisted product UX: designing grounded, useful GenAI experiences (RAG-style chat)."
      ],
      followUps: ["case_studies", "process", "leadership", "back_root"]
    },
    industries: {
      id: "industries",
      question: "What industries has he worked in?",
      answer: [
        "Refined fuels, energy trading, and wholesale fuel software (DTN).",
        "Healthcare systems (EHR scheduling modernization).",
        "Investment / legal document intelligence (enterprise AI).",
        "Operations & logistics platforms (fleet/load planning)."
      ],
      followUps: ["case_studies", "role_focus", "back_root"]
    },
    dev_background: {
      id: "dev_background",
      question: "Does he have a technical background?",
      answer: [
        "Yes \u2014 Zaki started his career as a software developer and moved into UX.",
        "That background helps him collaborate tightly with engineering, reason about constraints, and ship pragmatic solutions."
      ],
      followUps: ["tools_stack", "process", "back_root"]
    },
    case_studies: {
      id: "case_studies",
      question: "Which portfolio case study should I explore?",
      answer: [
        "Here are three flagship case studies \u2014 pick one:"
      ],
      followUps: ["cs_ehr", "cs_dociq", "cs_loadops", "back_root"]
    },
    cs_ehr: {
      id: "cs_ehr",
      question: "Net Health (Optima Therapy) \u2014 what was the impact?",
      answer: [
        "Modernized a legacy EHR scheduling experience into a unified, tablet-first workflow for iPad use in clinical settings.",
        "Focused on unifying multiple schedulers into one coherent experience to reduce confusion and training burden.",
        "Balanced real product constraints with a cleaner, more efficient daily workflow for clinical teams."
      ],
      followUps: ["cs_ehr_role", "cs_ehr_skills", "case_studies", "back_root"]
    },
    cs_ehr_role: {
      id: "cs_ehr_role",
      question: "What was Zaki's role on the EHR scheduling modernization?",
      answer: [
        "UX modernization and redesign lead for the scheduling experience.",
        "Discovery to understand scheduling variants, constraints, and why the legacy UI created user friction.",
        "Designed a unified tablet-first interaction model tailored to clinic workflows."
      ],
      followUps: ["cs_ehr_skills", "process", "back_root"]
    },
    cs_ehr_skills: {
      id: "cs_ehr_skills",
      question: "What skills does this case study demonstrate?",
      answer: [
        "Legacy-to-modern redesign under constraints.",
        "Complex workflow simplification and unification.",
        "iPad-first interaction and information density decisions.",
        "Stakeholder alignment around what \u201csimpler\u201d actually means."
      ],
      followUps: ["case_studies", "strengths", "back_root"]
    },
    cs_dociq: {
      id: "cs_dociq",
      question: "PGIM DocIQ \u2014 what did he design?",
      answer: [
        "An enterprise AI document intelligence experience for investment/legal teams.",
        "Designed GenAI + RAG-based chat flows to extract insights from complex financial documents (contracts, amendments, prospectus-style docs).",
        "Focused on usefulness and trust: helping teams find answers quickly without losing context."
      ],
      followUps: ["cs_dociq_value", "cs_dociq_safety", "ai_experience", "back_root"]
    },
    cs_dociq_value: {
      id: "cs_dociq_value",
      question: "What was the business value of DocIQ?",
      answer: [
        "Increased productivity for teams that spend time searching, interpreting, and cross-referencing long financial documents.",
        "Reduced time-to-answer by guiding users to relevant document insights via grounded retrieval (RAG)."
      ],
      followUps: ["cs_dociq_safety", "process", "back_root"]
    },
    cs_dociq_safety: {
      id: "cs_dociq_safety",
      question: "How does he think about trust in AI UX?",
      answer: [
        "Ground responses in the user\u2019s documents (RAG) rather than free-form answers.",
        "Make it easy to verify: clear sourcing, context, and \u201cwhat it used\u201d patterns (UX permitting).",
        "Design for failure: graceful \u2018I don\u2019t know\u2019 and clear next best actions."
      ],
      followUps: ["ai_experience", "case_studies", "back_root"]
    },
    cs_loadops: {
      id: "cs_loadops",
      question: "Optym LoadOps \u2014 what kind of UX work was it?",
      answer: [
        "Redesign work for operations/logistics teams dealing with load scheduling and fleet planning.",
        "Improved load/fleet tracking UX for operational users who need fast situational awareness and confident decisions."
      ],
      followUps: ["cs_loadops_skills", "process", "back_root"]
    },
    cs_loadops_skills: {
      id: "cs_loadops_skills",
      question: "What does LoadOps show hiring managers?",
      answer: [
        "Operational workflow design under real-world time pressure.",
        "Information hierarchy and clarity for monitoring + decision support.",
        "Enterprise usability improvements without oversimplifying complexity."
      ],
      followUps: ["case_studies", "strengths", "back_root"]
    },
    ai_experience: {
      id: "ai_experience",
      question: "What\u2019s Zaki\u2019s experience with AI products?",
      answer: [
        "Designed an enterprise AI document intelligence tool (PGIM DocIQ) using GenAI + RAG-style chat to analyze complex financial docs.",
        "Comfortable designing AI interactions that prioritize trust, verification, and workflow fit."
      ],
      followUps: ["cs_dociq", "cs_dociq_safety", "process", "back_root"]
    },
    process: {
      id: "process",
      question: "How does he approach discovery and design?",
      answer: [
        "Starts with workflow clarity: who\u2019s doing what, with which tools, under what constraints.",
        "Maps the messy reality, then converges on a simpler end-to-end flow with explicit tradeoffs.",
        "Validates through rapid iteration and alignment checkpoints to keep stakeholders and delivery in sync."
      ],
      followUps: ["leadership", "strengths", "case_studies", "back_root"]
    },
    leadership: {
      id: "leadership",
      question: "What does he bring as a senior designer / UX leader?",
      answer: [
        "Strong cross-functional collaboration \u2014 especially with engineering due to his dev background.",
        "Ability to drive alignment in complex enterprise environments and keep work outcome-focused.",
        "Comfortable owning ambiguous problem spaces and turning them into shippable plans."
      ],
      followUps: ["role_focus", "process", "availability_contact", "back_root"]
    },
    tools_stack: {
      id: "tools_stack",
      question: "What tools/stack does he use (and what\u2019s this site built with)?",
      answer: [
        "Portfolio site stack: React 19, Vite 7, Bootstrap 5, GSAP, and Lottie animations.",
        "Design work emphasizes pragmatic implementation constraints and smooth handoff."
      ],
      followUps: ["dev_background", "process", "back_root"]
    },
    availability_contact: {
      id: "availability_contact",
      question: "How do I reach him / where is he based?",
      answer: [
        "Based in Houston, Texas.",
        "Use the contact link below to reach out."
      ],
      followUps: ["back_root"]
    },
    back_root: {
      id: "back_root",
      question: "Ask another question",
      answer: ["No problem \u2014 where do you want to go next?"],
      followUps: ["role_focus", "case_studies", "ai_experience", "process", "leadership", "tools_stack", "availability_contact"]
    }
  };

  function getChipLabel(nodeId) {
    var node = NODES[nodeId];
    if (!node) return nodeId;
    return node.question || nodeId;
  }

  function createEl(tag, cls, attrs) {
    var el = document.createElement(tag);
    if (cls) el.className = cls;
    if (attrs) {
      Object.keys(attrs).forEach(function (k) { el.setAttribute(k, attrs[k]); });
    }
    return el;
  }

  function init() {
    if (document.getElementById('az-chat-root')) return;

    var isOpen = false;
    var history = [];
    var messages = [];
    var currentNodeId = 'root';

    var root = createEl('div', 'az-chat-root');
    root.id = 'az-chat-root';

    var fab = createEl('button', 'az-fab', { 'aria-label': 'Ask about Zaki', type: 'button' });
    fab.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';

    var panel = createEl('div', 'az-panel');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Ask about Zaki');

    var header = createEl('div', 'az-header');
    var headerLeft = createEl('div', 'az-header-left');
    var homeBtn = createEl('button', 'az-header-btn', { 'aria-label': 'Home', type: 'button' });
    homeBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><path d="M9 21V12h6v9"/></svg>';
    var backBtn = createEl('button', 'az-header-btn', { 'aria-label': 'Back', type: 'button' });
    backBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>';
    headerLeft.appendChild(backBtn);
    headerLeft.appendChild(homeBtn);

    var headerTitle = createEl('span', 'az-header-title');
    headerTitle.textContent = 'Ask about Zaki';

    var closeBtn = createEl('button', 'az-header-btn az-close-btn', { 'aria-label': 'Close chat', type: 'button' });
    closeBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';

    header.appendChild(headerLeft);
    header.appendChild(headerTitle);
    header.appendChild(closeBtn);

    var introBar = createEl('div', 'az-intro-bar');
    var introBarAvatar = createEl('span', 'az-avatar');
    introBarAvatar.textContent = 'Z';
    var introBarText = createEl('span', 'az-intro-text');
    introBar.appendChild(introBarAvatar);
    introBar.appendChild(introBarText);

    var body = createEl('div', 'az-body');
    var msgArea = createEl('div', 'az-messages');
    var chipsArea = createEl('div', 'az-chips');

    body.appendChild(msgArea);
    body.appendChild(chipsArea);

    var EMAIL = 'zaki@zakiahmed.org';
    var footer = createEl('div', 'az-footer');
    var footerInner = createEl('div', 'az-footer-inner');
    var emailSpan = createEl('span', 'az-footer-email');
    emailSpan.textContent = EMAIL;
    var copyBtn = createEl('button', 'az-copy-btn', { type: 'button', 'aria-label': 'Copy email address' });
    copyBtn.innerHTML = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
    var tooltip = createEl('span', 'az-copy-tooltip');
    tooltip.textContent = 'Copied!';
    copyBtn.appendChild(tooltip);

    copyBtn.addEventListener('click', function () {
      navigator.clipboard.writeText(EMAIL).then(function () {
        tooltip.classList.add('az-copy-tooltip--visible');
        setTimeout(function () { tooltip.classList.remove('az-copy-tooltip--visible'); }, 1800);
      });
    });

    footerInner.appendChild(emailSpan);
    footerInner.appendChild(copyBtn);
    footer.appendChild(footerInner);

    panel.appendChild(header);
    panel.appendChild(introBar);
    panel.appendChild(body);
    panel.appendChild(footer);
    root.appendChild(panel);
    root.appendChild(fab);
    document.body.appendChild(root);

    function toggle() {
      isOpen = !isOpen;
      if (isOpen) {
        panel.classList.add('az-panel--open');
        fab.classList.add('az-fab--hidden');
        panel.focus();
        if (messages.length === 0) renderNode('root', false);
      } else {
        panel.classList.remove('az-panel--open');
        fab.classList.remove('az-fab--hidden');
      }
    }

    function close() {
      if (isOpen) toggle();
    }

    function goHome() {
      history = [];
      messages = [];
      currentNodeId = 'root';
      render();
      renderNode('root', false);
    }

    function goBack() {
      if (history.length < 2) {
        goHome();
        return;
      }
      history.pop();
      var prevId = history[history.length - 1];
      messages.pop();
      messages.pop();
      currentNodeId = prevId;
      render();
      renderNode(prevId, false);
    }

    function renderNode(nodeId, addUserMsg) {
      var node = NODES[nodeId];
      if (!node) return;

      currentNodeId = nodeId;

      if (nodeId !== 'root' && addUserMsg !== false) {
        history.push(nodeId);
        messages.push({ type: 'user', text: node.question });
        messages.push({ type: 'assistant', lines: node.answer });
      } else if (nodeId === 'root' && addUserMsg !== false) {
        history = [];
      }

      render();
      scrollToBottom();
    }

    function selectOption(nodeId) {
      if (nodeId === 'back_root') {
        goHome();
        return;
      }
      renderNode(nodeId, true);
    }

    function render() {
      msgArea.innerHTML = '';
      chipsArea.innerHTML = '';

      introBarText.textContent = currentNodeId === 'root' ? NODES.root.prompt : 'What would you like to know?';

      messages.forEach(function (msg) {
        var el = createEl('div', 'az-msg az-msg--' + msg.type);
        if (msg.type === 'user') {
          el.textContent = msg.text;
        } else {
          var ul = createEl('ul', 'az-answer-list');
          msg.lines.forEach(function (line) {
            var li = createEl('li');
            li.textContent = line;
            ul.appendChild(li);
          });
          el.appendChild(ul);
        }
        msgArea.appendChild(el);
      });

      var node = NODES[currentNodeId];
      var chips = node.followUps || node.options || [];

      chips.forEach(function (chipId) {
        var btn = createEl('button', 'az-chip', { type: 'button' });
        btn.textContent = getChipLabel(chipId);
        btn.addEventListener('click', function () { selectOption(chipId); });
        chipsArea.appendChild(btn);
      });
    }

    function scrollToBottom() {
      requestAnimationFrame(function () {
        body.scrollTop = body.scrollHeight;
      });
    }

    fab.addEventListener('click', toggle);
    closeBtn.addEventListener('click', close);
    homeBtn.addEventListener('click', goHome);
    backBtn.addEventListener('click', goBack);

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) close();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
