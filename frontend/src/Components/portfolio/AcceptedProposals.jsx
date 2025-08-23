import React from 'react'
import { useEffect,useState } from 'react'
import JobCard from '../ProposalComponents/JobCard';
const AcceptedProposals = () => {
    const [proposals, setProposals] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
const fetchProposals = async () =>{
    try {
        const response = await fetch('http://localhost:3001/api/proposals/accepted-proposals',
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json'
                }
            }

        );

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProposals(data);
        console.log(data)

        localStorage.setItem('proposals', JSON.stringify(data));
        setLoading(false);
    } catch (error) {
        setError(error);
        setLoading(false);
    }
}
useEffect(() => {
    fetchProposals();
  }, []);

  return (
    <div className='grid grid-cols-2'>

        {proposals.map((job) => (

            <JobCard
                key={job.id}
                job={job}
                isSaved={savedJobs.has(job.id)}
                onToggleSave={() => toggleSaveJob(job.id)}
                onClick={() => handleJobClick(job)}
              />
        ))}

    </div>
  )
}

export default AcceptedProposals