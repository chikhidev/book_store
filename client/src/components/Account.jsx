import store from "../redux/store"
import { useState } from "react"
import { useSelector } from "react-redux"
import ChangeAvatar from "./ChangeAvatar"

const Account  = () => {
    let details = useSelector(state => state.userDetails)
    const [{ username, email, isAdmin, createdAt, bio, avatar }, setDetails] = useState(details) 
    return (
        <div className="ease-soft-in-out xl:ml-68.5 relative h-full max-h-screen rounded-xl transition-all duration-200 md:px-24" id="panel">
        <div className="w-full px-6 py-6 mx-auto loopple-min-height-78vh text-slate-500">
            
            <div className="w-full pb-6 mx-auto removable">
                <div className="flex flex-wrap -mx-3">
                <div className="w-full max-w-full px-3 lg-max:mt-6 xl:w-6/12 mb-4">
                        <div className="relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                            <div className="p-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
                                <div className="flex flex-wrap -mx-3">
                                    <div className="flex items-center w-full max-w-full px-3 shrink-0 md:w-8/12 md:flex-none">
                                        <h6 className="mb-0">Profile Information</h6>
                                    </div>
                                    <div className="relative flex flex-col flex-auto min-w-0 py-4 overflow-hidden break-words border-0 shadow-blur rounded-2xl bg-white/80 bg-clip-border">
                                        <div className="flex flex-wrap -mx-3">
                                            <div className="flex-none w-auto max-w-full px-3">
                                                <div className="text-base ease-soft-in-out h-24 w-24 relative inline-flex items-center justify-center rounded-xl text-white transition-all duration-200">
                                                    <img src={"http://localhost:4000" + avatar} alt="profile_image" className={`w-full shadow-soft-sm rounded-xl `}/>
                                                </div>
                                            </div>
                                            <div className="flex-none w-auto max-w-full px-3 py-2">
                                                <div className="h-full">
                                                    <h5 className="mb-1">{username}</h5>
                                                    <p className="mb-0 font-semibold leading-normal text-sm">{
                                                        isAdmin && 
                                                        <div className="">
                                                            <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">admin</span>
                                                        </div>
                                                    
                                                    }</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full max-w-full px-3 text-right shrink-0 md:w-4/12 md:flex-none">
                                        <a href="javascript:;" data-target="tooltip_trigger" data-placement="top">
                                            <i className="leading-normal fas fa-user-edit text-sm text-slate-400" aria-hidden="true"></i>
                                        </a>
                                        <div data-target="tooltip" className="px-2 py-1 text-center text-white bg-black rounded-lg text-sm hidden" role="tooltip" data-popper-placement="top"> Edit Profile <div className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']" data-popper-arrow="" ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-auto p-4">
                                <p className="leading-normal text-sm">Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).</p>
                                <hr className="h-px my-6 bg-transparent bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent" />
                                <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                                    <li className="relative block px-4 py-2 pt-0 pl-0 leading-normal bg-white border-0 rounded-t-lg text-sm text-inherit">
                                        <strong className="text-slate-700">Full Name:</strong> &nbsp; Alec M. Thompson
                                    </li>
                                    <li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit">
                                        <strong className="text-slate-700">Mobile:</strong> &nbsp; (44) 123 1234 123
                                    </li>
                                    <li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit">
                                        <strong className="text-slate-700">Email:</strong> &nbsp; alecthompson@mail.com
                                    </li>
                                    <li className="relative block px-4 py-2 pl-0 leading-normal bg-white border-0 border-t-0 text-sm text-inherit">
                                        <strong className="text-slate-700">Location:</strong> &nbsp; USA
                                    </li>
                                    <li className="relative block px-4 py-2 pb-0 pl-0 bg-white border-0 border-t-0 rounded-b-lg text-inherit">
                                        <strong className="leading-normal text-sm text-slate-700">Social:</strong> &nbsp; <a className="inline-block py-0 pl-1 pr-2 mb-0 font-bold text-center text-blue-800 align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-xs ease-soft-in bg-none" href="javascript:;">
                                            <i className="fab fa-facebook fa-lg" aria-hidden="true"></i>
                                        </a>
                                        <a className="inline-block py-0 pl-1 pr-2 mb-0 font-bold text-center align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-xs ease-soft-in bg-none text-sky-600" href="javascript:;">
                                            <i className="fab fa-twitter fa-lg" aria-hidden="true"></i>
                                        </a>
                                        <a className="inline-block py-0 pl-1 pr-2 mb-0 font-bold text-center align-middle transition-all bg-transparent border-0 rounded-lg shadow-none cursor-pointer leading-pro text-xs ease-soft-in bg-none text-sky-900" href="javascript:;">
                                            <i className="fab fa-instagram fa-lg" aria-hidden="true"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-full px-3 xl:w-6/12">
                        <div className="relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                            <div className="p-4 pb-0 mb-0 bg-white border-b-0 rounded-t-2xl">
                                <h6 className="mb-0">Platform Settings</h6>
                            </div>
                            <div className="flex-auto p-4">
                                <h6 className="font-bold leading-tight uppercase text-xs text-slate-500">Account</h6>
                                <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                                    <li className="relative block px-0 py-2 bg-white border-0 rounded-t-lg text-inherit">
                                        <div className="min-h-6 mb-0.5 block pl-0">
                                            
                                            <ChangeAvatar/>
                                            
							<label htmlFor="follow" className="w-4/5 mb-0 ml-4 overflow-hidden font-normal cursor-pointer select-none text-sm text-ellipsis whitespace-nowrap text-slate-500">Email me when someone follows me</label>
                                        </div>
                                    </li>
                                    <li className="relative block px-0 py-2 bg-white border-0 text-inherit">
                                        <div className="min-h-6 mb-0.5 block pl-0">
                                            <input id="answer" className="mt-0.54 rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.25 h-5 relative float-left ml-auto w-10 cursor-pointer appearance-none border border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right" type="checkbox"/>
                                            <label for="answer" className="w-4/5 mb-0 ml-4 overflow-hidden font-normal cursor-pointer select-none text-sm text-ellipsis whitespace-nowrap text-slate-500">Email me when someone answers on my post</label>
                                        </div>
                                    </li>
                                    <li className="relative block px-0 py-2 bg-white border-0 rounded-b-lg text-inherit">
                                        <div className="min-h-6 mb-0.5 block pl-0">
                                            <input id="mention" className="mt-0.54 rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.25 h-5 relative float-left ml-auto w-10 cursor-pointer appearance-none border border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right" type="checkbox" checked=""/>
                                            <label for="mention" className="w-4/5 mb-0 ml-4 overflow-hidden font-normal cursor-pointer select-none text-sm text-ellipsis whitespace-nowrap text-slate-500">Email me when someone mentions me</label>
                                        </div>
                                    </li>
                                </ul>
                                <h6 className="mt-6 font-bold leading-tight uppercase text-xs text-slate-500">Application</h6>
                                <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                                    <li className="relative block px-0 py-2 bg-white border-0 rounded-t-lg text-inherit">
                                        <div className="min-h-6 mb-0.5 block pl-0">
                                            <input id="launches projects" className="mt-0.54 rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.25 h-5 relative float-left ml-auto w-10 cursor-pointer appearance-none border border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right" type="checkbox" />
                                            <label for="launches projects" className="w-4/5 mb-0 ml-4 overflow-hidden font-normal cursor-pointer select-none text-sm text-ellipsis whitespace-nowrap text-slate-500">New launches and projects</label>
                                        </div>
                                    </li>
                                    <li className="relative block px-0 py-2 bg-white border-0 text-inherit">
                                        <div className="min-h-6 mb-0.5 block pl-0">
                                            <input id="product updates" className="mt-0.54 rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.25 h-5 relative float-left ml-auto w-10 cursor-pointer appearance-none border border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right" type="checkbox" checked=""/>
                                            <label for="product updates" className="w-4/5 mb-0 ml-4 overflow-hidden font-normal cursor-pointer select-none text-sm text-ellipsis whitespace-nowrap text-slate-500">Monthly product updates</label>
                                        </div>
                                    </li>
                                    <li className="relative block px-0 py-2 pb-0 bg-white border-0 rounded-b-lg text-inherit">
                                        <div className="min-h-6 mb-0.5 block pl-0">
                                            <input id="subscribe" className="mt-0.54 rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl after:duration-250 checked:after:translate-x-5.25 h-5 relative float-left ml-auto w-10 cursor-pointer appearance-none border border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right" type="checkbox" />
                                            <label for="subscribe" className="w-4/5 mb-0 ml-4 overflow-hidden font-normal cursor-pointer select-none text-sm text-ellipsis whitespace-nowrap text-slate-500">Subscribe to newsletter</label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    )
}
export default Account