'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface Class {
  id: number;
  name: string;
  createdAt: string;
}

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  classId: number;
  matricule: string | null;
}

interface Event {
  id: number;
  type: 'pos' | 'neg' | 'croix';
  studentId: number;
  points: number;
  comment: string | null;
  createdAt: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('classes');
  const [classes, setClasses] = useState<Class[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [classesRes, studentsRes, eventsRes] = await Promise.all([
          fetch('/api/classes'),
          fetch('/api/students'),
          fetch('/api/events')
        ]);

        const [classesData, studentsData, eventsData] = await Promise.all([
          classesRes.json() as Promise<Class[]>,
          studentsRes.json() as Promise<Student[]>,
          eventsRes.json() as Promise<Event[]>
        ]);

        setClasses(classesData);
        setStudents(studentsData);
        setEvents(eventsData);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Administration Tecnotalk</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="students">Étudiants</TabsTrigger>
          <TabsTrigger value="events">Événements</TabsTrigger>
        </TabsList>

        <TabsContent value="classes">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Classes</h2>
              <Button>Ajouter une classe</Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Date de création</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classes.map((class_) => (
                  <TableRow key={class_.id}>
                    <TableCell>{class_.id}</TableCell>
                    <TableCell>{class_.name}</TableCell>
                    <TableCell>{new Date(class_.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button variant="outline" className="mr-2">Modifier</Button>
                      <Button variant="destructive">Supprimer</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="students">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Étudiants</h2>
              <Button>Ajouter un étudiant</Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Prénom</TableHead>
                  <TableHead>Nom</TableHead>
                  <TableHead>Classe</TableHead>
                  <TableHead>Matricule</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.firstName}</TableCell>
                    <TableCell>{student.lastName}</TableCell>
                    <TableCell>{classes.find(c => c.id === student.classId)?.name || '-'}</TableCell>
                    <TableCell>{student.matricule || '-'}</TableCell>
                    <TableCell>
                      <Button variant="outline" className="mr-2">Modifier</Button>
                      <Button variant="destructive">Supprimer</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="events">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Événements</h2>
              <Button>Ajouter un événement</Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Étudiant</TableHead>
                  <TableHead>Points</TableHead>
                  <TableHead>Commentaire</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => {
                  const student = students.find(s => s.id === event.studentId);
                  return (
                    <TableRow key={event.id}>
                      <TableCell>{event.id}</TableCell>
                      <TableCell>{event.type}</TableCell>
                      <TableCell>{student ? `${student.firstName} ${student.lastName}` : '-'}</TableCell>
                      <TableCell>{event.points}</TableCell>
                      <TableCell>{event.comment || '-'}</TableCell>
                      <TableCell>{new Date(event.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button variant="outline" className="mr-2">Modifier</Button>
                        <Button variant="destructive">Supprimer</Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}