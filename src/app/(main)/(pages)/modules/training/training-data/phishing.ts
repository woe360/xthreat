// src/data/phishing.ts

export const phishingQuestions = [
    {
      question: "Which of the following is a common indicator of a phishing email?",
      options: [
        "The email address matches the company's domain",
        "Spelling and grammar errors",
        "Personalized greeting",
        "Contact information for a known person"
      ],
      answer: 1, // Correct answer index
      type: "single"
    },
    {
      question: "What should you do if you receive an unsolicited email asking for sensitive information?",
      options: [
        "Reply with the information requested",
        "Forward the email to your IT department",
        "Ignore and delete the email",
        "Click on the links to verify the email"
      ],
      answer: 1,
      type: "single"
    },
    {
      question: "Which of the following are signs of a phishing website? (Select all that apply)",
      options: [
        "A valid SSL certificate",
        "A URL that starts with 'https://'",
        "A strange or misspelled domain name",
        "Unusual pop-ups asking for personal information"
      ],
      multipleAnswers: [2, 3], // Indices of correct answers
      type: "multiple"
    },
    {
      question: "How can you verify the authenticity of a request for sensitive information?",
      options: [
        "Call the contact number provided in the email",
        "Check the sender's email address",
        "Verify with your IT department",
        "All of the above"
      ],
      answer: 3,
      type: "single"
    },
    {
      question: "What action should you take if you suspect you have been a victim of phishing?",
      options: [
        "Change your password immediately",
        "Notify your bank and credit card company",
        "Report it to the appropriate authorities",
        "All of the above"
      ],
      answer: 3,
      type: "single"
    },
    {
      question: "Identify the phishing indicators in the image below. (Select all that apply)",
      image: "/phishing-photo-1.jpg",
      correctAreas: [
        { x: 150, y: 80, width: 200, height: 30 }, // Example coordinates
        { x: 300, y: 200, width: 50, height: 50 }
      ],
      type: "image"
    },
    {
      question: "Which of the following are common phishing techniques? (Select all that apply)",
      options: [
        "Spoofing email addresses",
        "Sending legitimate-looking attachments",
        "Using encrypted communication",
        "Impersonating known contacts"
      ],
      multipleAnswers: [0, 1, 3],
      type: "multiple"
    },
    {
      question: "What should you do if you encounter a phishing link?",
      options: [
        "Click the link to investigate",
        "Report it to your organization",
        "Share it with your colleagues",
        "Ignore it and move on"
      ],
      answer: 1,
      type: "single"
    },
    {
      question: "Which of the following can be a sign of a phishing attempt? (Select all that apply)",
      options: [
        "An urgent request for personal information",
        "A request for your social security number",
        "A professional email signature",
        "A personalized email with your name"
      ],
      multipleAnswers: [0, 1],
      type: "multiple"
    },
    {
      question: "How can you protect yourself from phishing attacks?",
      options: [
        "Use strong and unique passwords",
        "Enable multi-factor authentication",
        "Regularly update your software",
        "All of the above"
      ],
      answer: 3,
      type: "single"
    },
    {
      question: "What is the best way to handle a suspicious email?",
      options: [
        "Open all links to check if they are safe",
        "Contact the supposed sender through a separate channel",
        "Delete the email immediately",
        "Forward the email to your friends"
      ],
      answer: 1,
      type: "single"
    },
    {
      question: "Review the following image and identify the phishing indicators. (Select all that apply)",
      image: "/phishing-photo-2.png",
      correctAreas: [
        { x: 100, y: 50, width: 250, height: 40 },
        { x: 300, y: 300, width: 70, height: 30 }
      ],
      type: "image"
    },
    {
      question: "Which security practice helps in preventing phishing attacks? (Select all that apply)",
      options: [
        "Regularly changing passwords",
        "Training employees on phishing",
        "Ignoring security alerts",
        "Using up-to-date antivirus software"
      ],
      multipleAnswers: [0, 1, 3],
      type: "multiple"
    },
    {
      question: "When should you be cautious about clicking on email links?",
      options: [
        "When the email comes from a known contact",
        "When the email is unsolicited and requests personal information",
        "When the email has a legitimate subject line",
        "When the email is addressed to multiple recipients"
      ],
      answer: 1,
      type: "single"
    },
    {
      question: "Identify the phishing red flags in this image. (Select all that apply)",
      image: "/phishing-photo-3.webp",
      correctAreas: [
        { x: 200, y: 150, width: 100, height: 50 },
        { x: 400, y: 250, width: 120, height: 60 }
      ],
      type: "image"
    },
    {
      question: "Which of the following practices can help you recognize phishing emails? (Select all that apply)",
      options: [
        "Checking the email address carefully",
        "Verifying the sender's identity",
        "Ignoring unusual formatting or language",
        "Using an email verification tool"
      ],
      multipleAnswers: [0, 1, 3],
      type: "multiple"
    },
    {
      question: "What should you do if you accidentally click on a phishing link?",
      options: [
        "Close the browser immediately",
        "Run a full system scan",
        "Change your passwords and monitor your accounts",
        "All of the above"
      ],
      answer: 3,
      type: "single"
    },
    {
      question: "Which method is commonly used by phishing attackers to deceive victims?",
      options: [
        "Social engineering",
        "Using secure connections",
        "Providing clear and accurate information",
        "Maintaining a professional appearance"
      ],
      answer: 0,
      type: "single"
    },
    {
      question: "Which actions can help you identify phishing attempts? (Select all that apply)",
      options: [
        "Examining the URL carefully",
        "Checking for HTTPS encryption",
        "Assessing the sender's email domain",
        "Ignoring suspicious emails"
      ],
      multipleAnswers: [0, 2],
      type: "multiple"
    },
    {
      question: "Review the image below for phishing signs. (Select all that apply)",
      image: "/phishing-photo-4.webp",
      correctAreas: [
        { x: 50, y: 100, width: 200, height: 40 },
        { x: 250, y: 200, width: 150, height: 50 }
      ],
      type: "image"
    },
    {
      question: "What is a common tactic used in phishing attacks?",
      options: [
        "Impersonating a trusted entity",
        "Using encryption for communication",
        "Providing accurate contact information",
        "Offering genuine assistance"
      ],
      answer: 0,
      type: "single"
    },
    {
      question: "Identify the phishing clues in this image. (Select all that apply)",
      image: "/phishing-photo-5.png",
      correctAreas: [
        { x: 180, y: 90, width: 220, height: 40 },
        { x: 350, y: 200, width: 80, height: 50 }
      ],
      type: "image"
    },
    //ranking
    {
      "question": "Which of these email subject lines is most likely to be a phishing attempt? Rank from most to least suspicious.",
      "options": [
        "Urgent: Your Account Has Been Compromised",
        "Newsletter: Latest Tech News and Updates",
        "Reminder: Your Scheduled Meeting Tomorrow",
        "Congratulations! You've Won a Free Vacation!"
      ],
      "answer": [0, 3, 1, 2],
      "type": "ranking"
    },
    {
      "question": "Rank the URLs below from most to least suspicious.",
      "options": [
        "http://secure-bank.com.login-verify.com",
        "http://secure-bank.com",
        "https://login.secure-bank.com",
        "http://secure-bank123.com"
      ],
      "answer": [0, 3, 1, 2],
      "type": "ranking"
    },
    {
      "question": "Rank these actions from safest to riskiest when receiving an unexpected email.",
      "options": [
        "Clicking on a link within the email",
        "Deleting the email without opening it",
        "Downloading an attachment from the email",
        "Forwarding the email to your IT team"
      ],
      "answer": [1, 3, 0, 2],
      "type": "ranking"
    },
    {
      "question": "Which of these is the strongest indicator that an email might be a phishing attempt? Rank from strongest to weakest.",
      "options": [
        "The email asks for personal information.",
        "The email has grammar and spelling errors.",
        "The email comes from a familiar name but an unfamiliar email address.",
        "The email uses a generic greeting like 'Dear Customer'."
      ],
      "answer": [0, 2, 1, 3],
      "type": "ranking"
    },
    {
      "question": "Rank these website features from most to least suspicious when visiting a site linked from an email.",
      "options": [
        "The URL is slightly different from the official site",
        "The site asks for login information immediately",
        "The site lacks a security certificate (no HTTPS)",
        "The site's logo and design seem outdated"
      ],
      "answer": [1, 0, 2, 3],
      "type": "ranking"
    },
    {
      "question": "Rank these security practices from most effective to least effective in protecting against phishing attacks.",
      "options": [
        "Using multi-factor authentication (MFA)",
        "Regularly changing your passwords",
        "Enabling email spam filters",
        "Avoiding clicking on suspicious links"
      ],
      "answer": [0, 3, 2, 1],
      "type": "ranking"
    },
    {
      "question": "Rank these email features from most to least likely to indicate a phishing attempt.",
      "options": [
        "An unfamiliar sender address",
        "A sense of urgency or threat",
        "The email contains a link asking for login credentials",
        "The email signature seems unprofessional"
      ],
      "answer": [2, 1, 0, 3],
      "type": "ranking"
    }
  ];
  