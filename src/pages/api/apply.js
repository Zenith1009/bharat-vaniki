import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const dataFilePath = path.join(process.cwd(), 'applications.json');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { fullName, gender, dob, education, phone, email, experience, reason, jobId } = req.body;

      // Read the existing data
      const data = await fs.readFile(dataFilePath, 'utf8');
      const jsonData = JSON.parse(data);

      // Create a new application object with a unique ID
      const newApplication = {
        id: uuidv4(),
        jobId,
        fullName,
        gender,
        dob,
        education,
        phone,
        email,
        experience,
        reason,
        timestamp: new Date().toISOString()
      };

      // Add the new application to the array
      jsonData.applications.push(newApplication);

      // Write the updated data back to the file
      await fs.writeFile(dataFilePath, JSON.stringify(jsonData, null, 2));

      // Send a success response
      res.status(200).json({ message: 'Application submitted successfully', id: newApplication.id });
    } catch (error) {
      console.error('Error saving application:', error);
      res.status(500).json({ message: 'Error saving application' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}