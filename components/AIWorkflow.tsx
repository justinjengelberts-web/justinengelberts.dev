"use client";

import { motion } from "framer-motion";
import { Terminal, Sparkles, Zap } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

const codeSnippet = `// Secure AI invoice processing pipeline
async function processInvoice(encryptedFile: Buffer) {
  // AES-256-GCM decryption
  const decrypted = await crypto.decrypt(
    encryptedFile,
    await getFileKey(invoice.keyId)
  );
  console.log("✓ Decryption successful");

  // Extract text with OCR
  const ocrText = await extractText(decrypted);

  // Mistral AI extraction with smart fallback
  const result = await mistral.chat({
    model: "mistral-small-latest",
    messages: [{
      role: "user",
      content: \`Extract invoice data:\\n\${ocrText}\`
    }]
  });

  // Validate & escalate if needed
  if (!isValid(result)) {
    return mistral.chat({
      model: "mistral-large-latest",
      // ... retry with larger model
    });
  }

  // Re-encrypt sensitive data before storage
  const encrypted = await crypto.encrypt(
    result.bankAccount,
    await generateKey()
  );
  console.log("✓ Encryption successful");

  return { ...result, bankAccount: encrypted };
}`;

export function AIWorkflow() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 px-6 bg-zinc-950 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium text-zinc-300 bg-white/5 border border-white/10 rounded-full">
              <Sparkles className="w-4 h-4" />
              {t.workflow.badge}
            </div>

            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
              {t.workflow.title}
            </h2>

            <p className="text-zinc-400 text-lg leading-relaxed mb-6">
              {t.workflow.description}
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-white/5 rounded-lg">
                  <Terminal className="w-5 h-5 text-zinc-300" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">
                    {t.workflow.terminalTitle}
                  </h3>
                  <p className="text-zinc-400 text-sm">
                    {t.workflow.terminalDescription}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-white/5 rounded-lg">
                  <Zap className="w-5 h-5 text-zinc-300" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">
                    {t.workflow.rapidTitle}
                  </h3>
                  <p className="text-zinc-400 text-sm">
                    {t.workflow.rapidDescription}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Code Snippet */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="min-w-0"
          >
            <div className="relative max-w-full">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl blur-xl" />
              <div className="relative bg-zinc-900/90 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
                {/* Window Header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-xs text-zinc-500 ml-2">
                    secure-ai-pipeline.ts
                  </span>
                </div>

                {/* Code */}
                <pre className="p-4 overflow-x-auto text-sm">
                  <code className="text-zinc-300 font-mono leading-relaxed whitespace-pre">
                    {codeSnippet}
                  </code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
