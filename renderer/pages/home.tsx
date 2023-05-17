import Head from "next/head";
import React, {useEffect} from "react";
import style from "../styles/home.module.css";
import {Icon} from "@iconify/react";
import ProjectBar from "../components/ProjectBar";
import Popup from "../components/Popup";

const Store = require("electron-store");
const store = new Store();

export default function Home() {
  const [projects, setProjects] = React.useState([]);

  const [showPopup, setShowPopup] = React.useState(false);

  const [projectName, setProjectName] = React.useState("");

  useEffect(() => {
    const temp = store.get("projects");
    if (temp) {
      setProjects(temp);
    } else {
      setProjects([])
    }
  }, []);

  useEffect(() => {
    store.set("projects", projects);
  }, [projects]);

  function newProject() {
    if (projectName === "") return;
    const date = new Date();
    const dateString = date.toLocaleDateString() + " " + date.toLocaleTimeString();
    const newProject = [...projects, [projectName, dateString]];
    setProjects(newProject);
    setProjectName("");
    setShowPopup(false);
  }

  function submitOrQuit(event: any) {
    if (event.key === "Enter") {
      newProject();
    } else if (event.key === "Escape") {
      cancelProject();
    }
  }

  function removeProject(event: any, index: number) {
    event.preventDefault()
    const projectName = projects[index][0];
    store.delete(projectName);
    const newProject = [...projects];
    newProject.splice(index, 1);
    setProjects(newProject);
  }

  function cancelProject() {
    setProjectName("");
    setShowPopup(false);
  }

  return (
    <React.Fragment>
      <Head>
        <title>Home - PhiColli</title>
      </Head>
      <Popup show={showPopup}>
        <span className="text-zinc-800 dark:text-slate-300 text-lg select-none">Enter Project Name:</span>
        <br/>
        <input
          type="text"
          placeholder="Project Name"
          required={true}
          value={projectName}
          autoFocus={true}
          onKeyUp={submitOrQuit}
          onChange={(e) => setProjectName(e.target.value)}
          className={"mt-2 mb-3 w-64 px-3 py-2 rounded-lg focus-visible:outline-none bg-slate-200 dark:bg-zinc-600 " +
            "border border-transparent hover:border-blue-300 dark:hover:border-blue-400 focus-visible:border-blue-400 " +
            "dark:focus-visible:border-blue-500 transition-colors text-slate-800 dark:text-slate-200"}
        />
        <br/>
        <button
          type="button"
          onClick={() => newProject()}
          className="bg-blue-500 dark:bg-blue-600 px-2 py-1 rounded-md text-slate-100 mr-3 hover:bg-blue-600 dark:hover:bg-blue-700"
        >
          Create
        </button>
        <button
          type="button"
          onClick={() => cancelProject()}
          className="bg-transparent px-2 py-1 rounded-md border border-zinc-300 dark:border-zinc-500 text-zinc-800 dark:text-zinc-300 hover:brightness-90"
        >
          Cancel
        </button>
      </Popup>
      <div className={"absolute top-14 select-none w-full p-6 " + style.main}>
        <div className="bg-slate-50 dark:bg-zinc-800 h-full p-5 rounded-2xl drop-shadow-lg dark:border dark:border-zinc-500">
          <div className="w-full flex justify-between mb-3">
            <span
              className="ml-5 relative text-lg sm:text-xl text-slate-800 dark:text-slate-200 before:content-[''] before:bg-blue-400 dark:before:bg-blue-500 before:absolute before:h-full before:w-1 before:-left-4">All Projects</span>
            <button
              className="group bg-sky-400 dark:bg-blue-500 hover:bg-sky-500 dark:hover:bg-blue-600 active:bg-sky-600 dark:active:bg-blue-700 pl-1 pr-1 sm:pr-2.5 py-0.5 rounded-full block"
              onClick={() => setShowPopup(true)}>
              <Icon icon="material-symbols:add-rounded" height={23} width={23}
                    className="text-slate-50 inline group-hover:rotate-90 group-hover:scale-110 transition-transform"/>
              <span className="text-md text-slate-50 align-middle hidden sm:inline">New Project</span>
            </button>
          </div>
          <div className="overflow-y-auto h-96">
            {
              projects.length > 0 &&
              projects.map((project, index) => (
                  <ProjectBar
                    key={index}
                    name={project[0]}
                    date={project[1]}
                    remove={(event) => removeProject(event, index)}
                  />
              ))
            }
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}