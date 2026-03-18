'use server';

export async function submitInquiry(formData: FormData) {
  const data = {
    name: formData.get('name') as string,
    company: formData.get('company') as string,
    phone: formData.get('phone') as string,
    email: formData.get('email') as string,
    industry: formData.get('industry') as string,
    budget: formData.get('budget') as string,
    message: formData.get('message') as string,
    createdAt: new Date().toISOString(),
  };

  // TODO: D1 연동
  console.log('Inquiry submitted:', data);

  return { success: true };
}
