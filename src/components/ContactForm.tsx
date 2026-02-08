import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  orderNumber: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    orderNumber: '',
    subject: 'general',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call - in real app, this would submit to your backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        orderNumber: '',
        subject: 'general',
        message: ''
      });
    } catch (error) {
      console.error('Failed to submit form:', error);
      // Handle error (show error message to user)
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-lg border text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
          <svg 
            className="w-8 h-8 text-green-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Message Sent Successfully!
        </h3>
        <p className="text-gray-600 mb-4">
          Thank you for contacting us. We'll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:underline"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg border">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Send us a Message
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label 
              htmlFor="name" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Full Name <span className="text-red-500" aria-label="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.name 
                  ? 'border-red-300 focus:border-red-500' 
                  : 'border-gray-300 focus:border-blue-500'
              }`}
              aria-describedby={errors.name ? 'name-error' : undefined}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address <span className="text-red-500" aria-label="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email 
                  ? 'border-red-300 focus:border-red-500' 
                  : 'border-gray-300 focus:border-blue-500'
              }`}
              aria-describedby={errors.email ? 'email-error' : undefined}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label 
              htmlFor="orderNumber" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Order Number <span className="text-gray-500">(optional)</span>
            </label>
            <input
              type="text"
              id="orderNumber"
              name="orderNumber"
              value={formData.orderNumber}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. IDP-123456"
            />
          </div>

          <div>
            <label 
              htmlFor="subject" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Subject
            </label>
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="general">General Inquiry</option>
              <option value="order-status">Order Status</option>
              <option value="refund">Refund Request</option>
              <option value="technical">Technical Support</option>
              <option value="documents">Document Issues</option>
              <option value="shipping">Shipping Questions</option>
            </select>
          </div>
        </div>

        <div>
          <label 
            htmlFor="message" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Message <span className="text-red-500" aria-label="required">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.message 
                ? 'border-red-300 focus:border-red-500' 
                : 'border-gray-300 focus:border-blue-500'
            }`}
            aria-describedby={errors.message ? 'message-error' : 'message-help'}
            placeholder="Please describe your question or concern in detail..."
          />
          {errors.message ? (
            <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.message}
            </p>
          ) : (
            <p id="message-help" className="mt-1 text-sm text-gray-500">
              Minimum 10 characters required
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <h4 className="text-sm font-medium text-blue-800 mb-2">Need Faster Help?</h4>
        <div className="text-sm text-blue-700 space-y-1">
          <p><strong>Phone:</strong> 1-800-IDP-HELP (24/7 support)</p>
          <p><strong>Live Chat:</strong> Available on our website</p>
          <p><strong>Email Response:</strong> Within 24 hours</p>
        </div>
      </div>
    </div>
  );
}