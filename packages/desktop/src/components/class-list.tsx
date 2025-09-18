import * as React from 'react';
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/stores/auth';

interface Class {
  id: number;
  name: string;
}

export function ClassList() {
  const [classes, setClasses] = useState<Class[]>([]);
  const { token } = useAuth();

  const fetchClasses = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/classes', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des classes');
      }
      
      const data = await response.json();
      setClasses(data);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les classes"
      });
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [token]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Liste des Classes</h2>
        <Button onClick={fetchClasses}>Actualiser</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classe) => (
          <Card key={classe.id} className="p-4">
            <h3 className="text-lg font-semibold">{classe.name}</h3>
            <p className="text-sm text-muted-foreground">ID: {classe.id}</p>
            <Button className="mt-2" variant="outline">
              Voir les détails
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}