import Link from "next/link";
import Head from "next/head";
import React from "react";

const Store = require("electron-store");
const store = new Store();

export default function Home() {
  let projects = store.get("projects");
  if (!projects) {
    projects = [];
  }
  return (
    <React.Fragment>
      <Head>
        <title>Home - PhiColli</title>
      </Head>
      <div className="mt-32">
        {

          projects.map((projectName: string, index: number) => {
            return (
              <Link href={`/simulation/${projectName}`} key={index}>
                <span className="text-2xl">{projectName}</span>
              </Link>
            )
          })
        }
      </div>
    </React.Fragment>
  )
}