// ai-assistant.js
// AENO V3 AI 大腦 - 完整程式碼（基於 Transformers.js 升級 nanoGPT placeholder）
// 支援 DNA 變異生成、多語言對話、學習評分、廣告歌控制

// 20星球-語言映射表（從大綱提取，粵語為主）
const AENO_PLANET_LANG_MAP = {
  "earth": "zh_HK", "mars": "ja", "ocean": "fr", "jungle": "es",
  "river": "pt", "desert": "ar", "mountain": "ru", "taiga": "de",
  "steppe": "it", "volcanic": "ko", "tundra": "vi", "swamp": "th",
  "crystal": "hi", "radiant": "ms", "abyssal": "tr", "meadow": "fa",
  "canyon": "ur", "plateau": "tl", "archipelago": "sw", "badlands": "en",
  "blackhole": "zh_HK" // 黑洞固定粵語
};

// AENO AI 大腦核心
const AENO_AI = {
  model: null,
  currentPlanet: "earth",
  currentLang: "zh_HK",
  currentAssistant: null,
  aiName: "AENO助手",
  log: [],

  // 初始化 AI 模型（distilgpt2，小巧適合瀏覽器）
  async init() {
    try {
      const { pipeline } = Xenova;
      this.model = await pipeline('text-generation', 'Xenova/distilgpt2', { device: 'webgpu' });
      console.log("AI 大腦載入成功！");
    } catch (e) {
      console.error("AI 載入失敗，使用 fallback：", e);
      this.model = null;
    }
  },

  // 設置星球 + 語言 + 助手
  setCurrentPlanet(planetKey) {
    const cleanKey = planetKey.toLowerCase().trim().replace(/planet-| /g, "");
    this.currentPlanet = cleanKey;
    this.currentLang = AENO_PLANET_LANG_MAP[cleanKey] || "zh_HK";
    if (window.AENO_CHARACTERS) {
      this.currentAssistant = window.getAssistantForPlanet(cleanKey) || window.AENO_CHARACTERS.defaultAssistant;
      this.aiName = this.currentAssistant.displayName || "AENO助手";
    }
    this.log.push(`切換星球: ${planetKey}, 語言: ${this.currentLang}`);
  },

  // 獲取隨機對話
  getRandomDialog(dialogKey) {
    if (!this.currentAssistant || !this.currentAssistant.dialogues[dialogKey]) return "";
    const dialogList = this.currentAssistant.dialogues[dialogKey][this.currentLang] || this.currentAssistant.dialogues[dialogKey]["zh_HK"];
    return dialogList[Math.floor(Math.random() * dialogList.length)];
  },

  // 生成 DNA 變異（AI 大腦核心，每 100 年呼叫）
  async generateDNAMutation(entityType = 'plant') {
    if (!this.model) {
      // Fallback 隨機變異
      const traits = ['size', 'color', 'growth', 'resistance', 'ability'];
      const changes = traits.map(t => `${t}: ${Math.random() > 0.5 ? 'increase' : 'decrease'} ${Math.floor(Math.random() * 50 + 10)}%`);
      return changes.join(', ');
    }

    const prompt = `Generate a creative DNA mutation for a ${entityType} in a quantum planet game. Change 3-5 traits: size, color, growth speed, resistance (poison/fire/cold), new ability (glowing/flying). Output format: Trait1: change, Trait2: change. Language: ${this.currentLang}. Balanced and fun.`;

    const output = await this.model(prompt, { max_new_tokens: 100, temperature: 0.9, top_k: 50, do_sample: true });
    const mutationText = output[0].generated_text.slice(prompt.length).trim();
    this.log.push(`變異生成: ${mutationText}`);
    return mutationText;
  },

  // 解析變異文字
  parseMutation(text) {
    const changes = {};
    text.split(',').forEach(part => {
      const [trait, value] = part.split(':').map(s => s.trim());
      if (trait && value) changes[trait.toLowerCase()] = value;
    });
    return changes;
  },

  // 對話函數（支援指令 + 多語言）
  async talk(inputText) {
    const text = inputText.toLowerCase().trim();
    if (text === "" || ["hi", "hello", "你好"].includes(text)) {
      return this.getRandomDialog("greet") || `你好！我是${this.aiName}`;
    }
    // 其他指令...
    return "未知指令，請試其他。";
  },

  // 語言學習評分（Proof of Pronunciation, 模擬 40% 門檻）
  evaluatePronunciation(userInput, targetWord) {
    // 模擬評分（未來接 STT）
    const score = Math.random() * 100; // 隨機模擬
    const passed = score >= 40;
    return { score, passed, fragments: passed ? Math.floor(score / 20) : 0 };
  },

  clearLog() { this.log = []; }
};

window.AENO_AI = AENO_AI;
