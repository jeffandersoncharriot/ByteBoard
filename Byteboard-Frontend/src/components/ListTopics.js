import { useNavigate } from "react-router-dom"


function ListTopics({topics})
{
    const navigate = useNavigate()
    try{
    
        return(
            <div className="topic-container">

                    {topics.map((topic) =>(
                       
              
                        <h4>({topic.topicName})</h4>
                       
                    ))}
           
            </div>
        )
                    }
                    catch(error)
                    {
                       
                        navigate("/usererror", { state: { errorMessage: error.message} })
                    }
}


export {ListTopics}