import React, { useEffect, useState } from 'react';


/**
 * Displays all job listings and a forum to create a job listing
 */
function JobForm() {

    const [jobTitle, setJobTitle] = useState(null)
    const [jobContent, setJobContent] = useState(null)



    const createJobListing = async () => {
        try {



            let topics = ["Job"];




            const requestOptions = {
                method: "POST",
                credentials: "include",
                body: JSON.stringify({
                    title: jobTitle,
                    content: jobContent,
                    topicNames: topics

                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }

            const response = await fetch("http://localhost:1339/posts", requestOptions)

            if (response.status === 200) {
                alert("Job Post created")

            }
            else {

                let result = await response.json()
                alert(result.errorMessage)

            }
        }
        catch (error) {
            alert(error.message)
        }
    }


    return (
        <div>
        <div className="post">
            <h1>Create a Job</h1>
            <input type="text" placeholder="Job Title" onChange={(e) => setJobTitle(e.target.value)} />
            <input type="text" placeholder="Job Description" onChange={(e) => setJobContent(e.target.value)} />

          {jobTitle && jobContent &&  <button class="btn btn-light" onClick={createJobListing}>Create Job Listing</button>}
</div>
            <h1>List of job offers</h1>
        </div>
    );
}

//{jobListings.map((job) => (
//<div key={job.id}>{job.title}</div>
//We need to configure the db for this to work
//))}

export { JobForm };
