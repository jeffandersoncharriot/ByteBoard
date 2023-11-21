import { useNavigate, useParams } from "react-router-dom"

/**
 *  information about the company ByteBoard and some employees
 * @returns information about the company (introduction)
 */
function About() {
    const { employee } = useParams()

    return (
        <div>
            <h1>We're really awesome</h1>

            {employee === "Ryan" && <h2>Ryan is good programmer and  he's motivation is to persuade rookies into getting experience where they can</h2>}
            {employee === "Caden" && <h2>Caden is very smart and went to university Yale, his first job was a little company that helped him get up and now works at Google</h2>}
            {employee === "Jeff" && <h2>Jeff's motivation is everything, the idea of this website to make people interact with eachother while searching for jobs is exhilarating</h2>}

            <a href="/about/Ryan">
                <p>Ryan</p>
            </a>
            <a href="/about/Jeff">
                <p>Jeff</p>
            </a>
            <a href="/about/Caden">
                <p>Caden</p>
            </a>

            <p>
                Many people search for jobs on the internet, and companies that receive tons of applications are left disappointed as they don’t seek what they hope for. Instead, they’re wasting their time looking through tons of applications in the hope to find one. We thought that companies should have an app for themselves to look for potential candidates that can fit in their job. Jeff wants to give the users a chance of producing their best portfolio for the world and to only wait for some good responses from companies. Caden also matched that with the company's view that won’t have to waste their time looking through applications because they can look through potential workers. Ryan had the main idea because of how most people that are looking for a job just apply randomly when they don’t recognize that they don’t have sufficient requirements, so reversing how hiring would work would benefit the employer and the people looking for jobs. We have tons of candidates waiting for a message from a company, a discussion forum so that companies and people looking for jobs can interact with each other. Jeff also wanted it to be focused on computer science as it gets hard to get a job in computer science without a high-level degree in university as the company’s demand. But while putting your achievements, you can get some smaller companies that you don’t normally see to reach out for you to extend your experience and knowledge!
            </p>
        </div>

    )
}

export default About