const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getDocuments = async () => {
  const response = await fetch(`${API_URL}/getDocuments`);
  return await response.json();
};

export const uploadDocument = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/uploadDocument`, {
    method: "POST",
    body: formData,
  });

  return await response.json();
};

export const sendMessage = async (message: string, document_id: string) => {
  const response = await fetch(`${API_URL}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, document_id }),
  });

  return await response.json();
}

export const chatHistory = async (question: string, answer: string, feedback: string, document_id: string) => {
  const response = await fetch(`${API_URL}/chatHistory`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ question, answer, feedback, document_id }),
  });

  return await response.json();
}