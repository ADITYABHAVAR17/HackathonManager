import React,{useState,useEffect} from 'react'
import {useParams } from "react-router-dom"
import axios from "axios"

function ProblemCard() {
    const [problem, setProblem] = useState(null);
    const {id} =  useParams()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(''); // Replace with your API endpoint
                setData(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs only once on mount
    

  return (
    <div>ProblemCard</div>
  )
}

export default ProblemCard