export interface ContactFormPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormResult {
  success: boolean;
  message: string;
}

const SIMULATED_DELAY_MS = 500;
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const contactService = {
  submit: async (payload: ContactFormPayload): Promise<ContactFormResult> => {
    await delay(SIMULATED_DELAY_MS);

    if (!payload.name || !payload.email || !payload.message) {
      return { success: false, message: "Please fill in all required fields." };
    }

    console.log("Contact form submitted:", payload);
    return {
      success: true,
      message: "Thanks! We've received your message and will get back to you within 24 hours.",
    };
  },
};