import {
    FaReact,
    FaVuejs,
    FaNodeJs,
    FaLaravel,
    FaJava,
    FaGitAlt,
    FaDocker,
    FaFigma,
} from "react-icons/fa";

import {
    SiFirebase,
    SiMysql,
    SiSqlite,
    SiTailwindcss,
    SiTypescript,
    SiJavascript,
    SiSpringboot,
    SiPostman,
    SiAngular,
    SiBootstrap,
    SiJquery,
    SiGithubactions,
    SiFlask,
    SiWordpress,
    SiFlutter,
    SiCanva,
} from "react-icons/si";


// import { DiPhotoshop } from "react-icons/di";
import { DiMsqlServer } from "react-icons/di";
import { TbBrandAdobePremier, TbBrandAdobePhotoshop, TbBrandAdobeIllustrator, TbBrandCSharp } from "react-icons/tb";

export const techIcons = {
    "React.js": <FaReact className="text-cyan-400" />,
    "React Native": <FaReact className="text-cyan-400" />,

    "Vue.js": <FaVuejs className="text-green-400" />,

    "Angular": <SiAngular className="text-red-500" />,

    "Node.js": <FaNodeJs className="text-green-500" />,

    "Laravel": <FaLaravel className="text-red-500" />,

    "Flutter": <SiFlutter className="text-sky-400" />,

    "Firebase": <SiFirebase className="text-yellow-400" />,

    "MySQL": <SiMysql className="text-blue-400" />,

    "SQL Server": <DiMsqlServer className="text-blue-400" />,

    "SQLite": <SiSqlite className="text-gray-300" />,

    "Tailwind": <SiTailwindcss className="text-cyan-300" />,
    "Tailwind CSS": <SiTailwindcss className="text-cyan-300" />,

    "Javascript": <SiJavascript className="text-yellow-300" />,
    "JavaScript": <SiJavascript className="text-yellow-300" />,

    "TypeScript": <SiTypescript className="text-blue-500" />,

    "Spring Boot": <SiSpringboot className="text-green-500" />,

    "Java": <FaJava className="text-orange-400" />,
    "C#": <TbBrandCSharp className="text-purple-400" />,

    "Bootstrap": <SiBootstrap className="text-purple-500" />,

    "Jquery": <SiJquery className="text-blue-400" />,

    "Git (GitHub)": <FaGitAlt className="text-orange-500" />,

    "Docker": <FaDocker className="text-blue-400" />,

    "GitHub Actions": <SiGithubactions className="text-gray-300" />,

    "Figma": <FaFigma className="text-pink-400" />,

    "Photoshop": <TbBrandAdobePhotoshop className="text-blue-500" />,

    "Adobe Illustrator": <TbBrandAdobeIllustrator className="text-orange-400" />,

    "Premiere Pro": <TbBrandAdobePremier className="text-violet-400" />,

    "Wordpress": <SiWordpress className="text-blue-400" />,

    "Flask": <SiFlask className="text-green-400" />,

    "Postman": <SiPostman className="text-orange-500" />,

    "Canva": <SiCanva className="text-green-400" />,
};