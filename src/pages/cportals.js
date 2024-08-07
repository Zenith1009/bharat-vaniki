import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from 'next/link';

const Sidebar = () => (
  <nav className="flex flex-col gap-4 mt-8">
    <Link href="/" className="text-lg hover:underline transition-colors duration-200 hover:text-green-200">Home</Link>
    <Link href="/forests" className="text-lg hover:underline transition-colors duration-200 hover:text-green-200">Forests</Link>
    <Link href="/gallery" className="text-lg hover:underline transition-colors duration-200 hover:text-green-200">Gallery</Link>
    <Link href="/plan-your-trip" className="text-lg hover:underline transition-colors duration-200 hover:text-green-200">Plan Your Trip</Link>
    <Link href="/conservation-efforts" className="text-lg hover:underline transition-colors duration-200 hover:text-green-200">Conservation Efforts</Link>
    <Link href="/cp" className="text-lg hover:underline transition-colors duration-200 hover:text-green-200">Career Portal</Link>
    <Link href="/about" className="text-lg hover:underline transition-colors duration-200 hover:text-green-200">About</Link>
  </nav>
);

const CareerPortalPage = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    dob: '',
    education: '',
    phone: '',
    email: '',
    experience: '',
    reason: ''
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs');
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, jobId: selectedJob.id }),
      });
      if (response.ok) {
        const data = await response.json();
        alert(`Application submitted successfully! Your application ID is: ${data.id}`);
        setSelectedJob(null);
        setFormData({
          fullName: '',
          gender: '',
          dob: '',
          education: '',
          phone: '',
          email: '',
          experience: '',
          reason: ''
        });
      } else {
        alert('Error submitting application. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again.');
    }
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const dobDate = new Date(formData.dob);
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear();

    return (
      formData.fullName.trim() !== '' &&
      formData.gender !== '' &&
      formData.dob !== '' &&
      age >= 21 &&
      formData.education.trim() !== '' &&
      phoneRegex.test(formData.phone) &&
      emailRegex.test(formData.email) &&
      formData.experience.trim() !== '' &&
      formData.reason.trim() !== ''
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-green-50 relative overflow-hidden">
      <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/images/cp_bg.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <div className="relative z-20">
          <div className="sunray-container absolute inset-0 z-10 pointer-events-none"></div>
          <header className="bg-green-800 text-white p-2 relative z-20">
            <div className="container mx-auto flex items-center justify-between">
              <Sheet open={isNavOpen} onOpenChange={setIsNavOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-green-700">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-green-700 text-white">
                  <Sidebar />
                </SheetContent>
              </Sheet>
              <div className="text-center flex-grow">
                <h1 className="text-2xl font-bold">Career Portal</h1>
                <p className="text-sm">Forestry Professional Opportunities</p>
              </div>
            </div>
          </header>

          <main className="flex-grow p-4 relative z-20">
            <div className="max-w-4xl mx-auto">
              {!selectedJob ? (
                <>
                  <Card className="bg-green-100 bg-opacity-50 border-green-300 mb-8 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-2xl text-green-800">Join Our Team of Forestry Professionals</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-green-700">Explore exciting career opportunities in forest conservation, management, and research. Make a difference in preserving India's natural heritage.</p>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {jobs.map((job) => (
                      <Card
                        key={job.id}
                        className="bg-white bg-opacity-60 border-green-200 hover:shadow-lg transition-all duration-300 cursor-pointer backdrop-blur-sm transform hover:scale-105 hover:bg-gradient-to-br hover:from-green-200 hover:to-green-400"
                        onClick={() => handleJobClick(job)}
                      >
                        <CardHeader>
                          <CardTitle className="text-xl text-green-800">{job.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-green-700 mb-2">{job.description}</p>
                          <p className="text-sm text-green-600">Location: {job.location}</p>
                          <p className="text-sm text-green-600">Experience: {job.experience}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              ) : (
                <Card className="bg-white bg-opacity-80 border-green-300 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-2xl text-green-800">Apply for {selectedJob.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label>Gender</Label>
                        <RadioGroup name="gender" value={formData.gender} onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))} required>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="male" />
                            <Label htmlFor="male">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="female" />
                            <Label htmlFor="female">Female</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="other" id="other" />
                            <Label htmlFor="other">Other</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div>
                        <Label htmlFor="dob">Date of Birth (Must be over 21)</Label>
                        <Input
                          id="dob"
                          name="dob"
                          type="date"
                          value={formData.dob}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="education">Education Information</Label>
                        <Textarea
                          id="education"
                          name="education"
                          value={formData.education}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          pattern="\d{10}"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="experience">Experience</Label>
                        <Textarea
                          id="experience"
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="reason">Reason for Applying</Label>
                        <Textarea
                          id="reason"
                          name="reason"
                          value={formData.reason}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="flex justify-between">
                        <Button type="button" onClick={() => setSelectedJob(null)} className="bg-gray-500 hover:bg-gray-600">Back to Jobs</Button>
                        <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={!validateForm()}>Submit Application</Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
              <Card className="bg-green-100 bg-opacity-60 border-green-300 mt-8 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-green-800">Get Involved</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-700">Your support can make a difference in our conservation efforts. Whether through volunteering, or spreading awareness, every action counts in protecting our precious forests.</p>
                  <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <Button className="bg-green-600 hover:bg-green-700 mx-auto block">                                        <Link href="https://indiaenvironment.org/volunteer/"
                      className="text-lg hover:underline transition-colors duration-200 hover:text-green-200"
                      target="_blank"
                      rel="noopener noreferrer">
                      Volunteer
                    </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>

          <footer className="bg-green-800 text-white p-4 relative z-20">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
              <div className="mb-2 md:mb-0">
                <h3 className="text-lg font-semibold mb-1">Stay Connected</h3>
                <div className="flex gap-4">
                  <a href="#" className="text-white hover:text-green-200 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                  </a>
                  <a href="#" className="text-white hover:text-green-200 transition-colors duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
                  </a>
                </div>
              </div>
              <div className="text-center md:text-right">
                <p className="text-sm">&copy; 2024 Indian Forests. All rights reserved.</p>
                <p className="text-sm mt-1">Designed with 🌿 for nature lovers</p>
              </div>
            </div>
          </footer>
        </div>
      </div>

    </div>
  );
};

export default CareerPortalPage;