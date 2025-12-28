
// 内部 LLM 服务（OpenAI 兼容格式）
interface LLMConfig {
  apiUrl: string;
  authToken: string;
  defaultModel: string;
}

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface LLMResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class SaleSmartAI {
  private config: LLMConfig;

  constructor() {
    // 从环境变量获取配置，支持多种命名方式
    const apiUrl = (
      import.meta.env?.VITE_LLM_API_URL ||
      import.meta.env?.LLM_API_URL ||
      (typeof process !== 'undefined' && process.env?.LLM_API_URL)
    ) as string | undefined;

    const authToken = (
      import.meta.env?.VITE_LLM_AUTH_TOKEN ||
      import.meta.env?.LLM_AUTH_TOKEN ||
      (typeof process !== 'undefined' && process.env?.LLM_AUTH_TOKEN)
    ) as string | undefined;

    const defaultModel = (
      import.meta.env?.VITE_LLM_DEFAULT_MODEL ||
      import.meta.env?.LLM_DEFAULT_MODEL ||
      (typeof process !== 'undefined' && process.env?.LLM_DEFAULT_MODEL) ||
      'qwen3-max'
    ) as string;

    // 使用默认值（公司内部配置）
    this.config = {
      apiUrl: apiUrl || 'https://ymcas-llm.yxt.com/ymcas-ai/multi-model/v1/chat/completions',
      authToken: authToken || 'aItutor-47bf6e80-0979-4f13-95b4-d0db46e5f62c',
      defaultModel: defaultModel,
    };

    // 调试信息（仅在开发环境）
    if (import.meta.env?.DEV) {
      console.log('LLM 配置:', {
        apiUrl: this.config.apiUrl,
        hasAuthToken: !!this.config.authToken,
        model: this.config.defaultModel,
      });
    }
  }

  private async callLLM(messages: ChatMessage[], options?: { responseFormat?: { type: string } }): Promise<string> {
    try {
      const response = await fetch(this.config.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.authToken}`,
        },
        body: JSON.stringify({
          model: this.config.defaultModel,
          messages: messages,
          temperature: 0.7,
          ...(options?.responseFormat && { response_format: options.responseFormat }),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('LLM API 错误:', response.status, errorText);
        throw new Error(`LLM API 请求失败: ${response.status} ${errorText}`);
      }

      const data: LLMResponse = await response.json();
      return data.choices[0]?.message?.content || "抱歉，无法处理该请求。";
    } catch (error: any) {
      console.error("LLM 调用错误:", error);
      throw error;
    }
  }

  async ask(prompt: string): Promise<string> {
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: '你是 SaleSmart 助手，一个专业的销售对话智能 AI。帮助用户分析商机、撰写邮件和研究客户。回答要简洁、专业且数据驱动。',
      },
      {
        role: 'user',
        content: prompt,
      },
    ];

    return await this.callLLM(messages);
  }

  async analyzeConversation(transcript: string): Promise<any> {
    const prompt = `分析以下销售对话记录，并提供摘要、关键信号（如竞争对手提及或预算）以及销售人员的能力评分（0-100）。

对话记录：
${transcript}

请以 JSON 格式返回，包含以下字段：
- summary: 对话摘要（字符串）
- signals: 关键信号数组（字符串数组）
- abilityScore: 销售人员能力评分（0-100 的数字）
- taskScore: 任务完成度评分（0-100 的数字）
- nextStep: 下一步建议（字符串）`;

    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: '你是一个专业的销售对话分析专家。分析销售对话并提供结构化的 JSON 响应。',
      },
      {
        role: 'user',
        content: prompt,
      },
    ];

    try {
      const response = await this.callLLM(messages, {
        responseFormat: { type: 'json_object' },
      });

      // 尝试解析 JSON 响应
      try {
        return JSON.parse(response);
      } catch (parseError) {
        // 如果响应不是纯 JSON，尝试提取 JSON 部分
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
        // 如果无法解析，返回默认结构
        return {
          summary: response.substring(0, 200),
          signals: [],
          abilityScore: 70,
          taskScore: 70,
          nextStep: '继续跟进客户需求',
        };
      }
    } catch (error) {
      console.error("对话分析错误:", error);
      return null;
    }
  }
}
