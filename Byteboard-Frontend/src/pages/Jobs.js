import React, { useEffect, useState } from 'react';
import { JobForm } from '../components/JobForm';
import { AllJobs } from "../components/AllJobs"

/**
 * Displays all job listings and a forum to create a job listing
 */
function Jobs() {


  return (
    <div>
      <JobForm />
      <AllJobs />
    </div>
  );
}


export default Jobs;
