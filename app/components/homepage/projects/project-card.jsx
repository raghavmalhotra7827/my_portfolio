// @flow strict
"use client"

import * as React from 'react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaExternalLinkAlt, FaCircle } from 'react-icons/fa';

function ProjectCard({ project }) {
  // Check if this is a project with a demo link
  const hasDemo = project.demo && project.demo.length > 0;
  
  // Function to get appropriate screenshot based on project name or ID
  const getProjectScreenshot = () => {
    // Try to match project to specific screenshots we have
    if (project.name.toLowerCase().includes('video streaming') || project.name.toLowerCase().includes('uploadview')) {
      return '/image/uploadview.com.png';
    } else if (project.name.toLowerCase().includes('travel')) {
      return '/image/travel.jpg';
    } else if (project.name.toLowerCase().includes('real estate')) {
      return '/image/real-estate.jpg';
    } else if (project.image && project.image.src) {
      // Use project's specified image if available
      return project.image.src.startsWith('http') ? '/image/screen.png' : project.image.src;
    }
    // Default screenshot
    return '/image/screen.png';
  };

  return (
    <div className="from-[#0d1224] border-[#1b2c68a0] relative rounded-lg border bg-gradient-to-r to-[#0a0d37] w-full">
      <div className="flex flex-row">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
        <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
      </div>
      <div className="px-4 lg:px-8 py-3 lg:py-5 relative">
        <p className="text-center text-[#16f2b3] text-base lg:text-xl">
          {project.name}
        </p>
      </div>

      {hasDemo ? (
        <div className="overflow-hidden border-t-[2px] border-indigo-900 px-4 lg:px-8 py-4 lg:py-8">
          <div className="relative">
            {/* Website preview using local image instead of Microlink */}
            <div className="border border-gray-700 rounded-lg overflow-hidden shadow-lg">
              {/* Browser header styled to look like a browser */}
              <div className="bg-[#1a1443] px-4 py-2 flex items-center">
                <div className="flex space-x-2 mr-4">
                  <FaCircle className="text-red-500" size={12} />
                  <FaCircle className="text-yellow-500" size={12} />
                  <FaCircle className="text-green-500" size={12} />
                </div>
                <div className="flex-1 bg-[#0d1224] rounded-md px-3 py-1 text-xs text-gray-300 flex items-center">
                  <span className="truncate">{project.demo}</span>
                </div>
              </div>
              
              {/* Image component to show website preview */}
              <div className="w-full h-[320px] relative">
                <Image
                  src={getProjectScreenshot()}
                  alt={`${project.name} website preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={90}
                  priority={true}
                  className="object-cover object-top"
                />
              </div>
              
              {/* Visit website button */}
              <div className="p-4 bg-[#0f0b24] border-t border-gray-700">
                <div className="flex justify-between items-center">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.tools.slice(0, 4).map((tool, index) => (
                      <span key={index} className="text-xs bg-[#1a1443] px-2 py-1 rounded text-[#16f2b3]">{tool}</span>
                    ))}
                  </div>
                  <Link 
                    href={project.demo} 
                    target="_blank"
                    className="inline-flex items-center gap-2 bg-[#16f2b3] text-black px-4 py-2 rounded-md w-fit hover:bg-white transition-colors text-sm font-medium"
                  >
                    Visit Website <FaExternalLinkAlt size={12} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden border-t-[2px] border-indigo-900 px-4 lg:px-8 py-4 lg:py-8">
          <code className="font-mono text-xs md:text-sm lg:text-base">
            <div className="blink">
              <span className="mr-2 text-pink-500">const</span>
              <span className="mr-2 text-white">project</span>
              <span className="mr-2 text-pink-500">=</span>
              <span className="text-gray-400">{'{'}</span>
            </div>
            <div>
              <span className="ml-4 lg:ml-8 mr-2 text-white">name:</span>
              <span className="text-gray-400">{`'`}</span>
              <span className="text-amber-300">{project.name}</span>
              <span className="text-gray-400">{`',`}</span>
            </div>
            <div className="ml-4 lg:ml-8 mr-2">
              <span className=" text-white">tools:</span>
              <span className="text-gray-400">{` ['`}</span>
              {
                project.tools.map((tag, i) => (
                  <React.Fragment key={i}>
                    <span className="text-amber-300">{tag}</span>
                    {
                      project.tools?.length - 1 !== i &&
                      <span className="text-gray-400">{`', '`}</span>
                    }
                  </React.Fragment>
                ))
              }
              <span className="text-gray-400">{"],"}</span>
            </div>
            <div>
              <span className="ml-4 lg:ml-8 mr-2 text-white">myRole:</span>
              <span className="text-orange-400">{project.role}</span>
              <span className="text-gray-400">,</span>
            </div>
            <div className="ml-4 lg:ml-8 mr-2">
              <span className="text-white">Description:</span>
              <span className="text-cyan-400">{' ' + project.description}</span>
              <span className="text-gray-400">,</span>
            </div>
            <div><span className="text-gray-400">{`};`}</span></div>
          </code>
          
          {hasDemo && (
            <div className="mt-4 flex justify-end">
              <Link 
                href={project.demo} 
                target="_blank"
                className="inline-flex items-center gap-2 bg-[#16f2b3] text-black px-4 py-2 rounded-md w-fit hover:bg-white transition-colors text-sm font-medium"
              >
                Visit Website <FaExternalLinkAlt size={12} />
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProjectCard;