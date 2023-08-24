//import logo from './logo.svg';
import "./App.css";
import React, { useEffect, useState } from "react"; //import React and useEffect
import UserList from "./UserList";
import PostList from "./PostList";

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  //Make an API Call:
  useEffect(() => {
    const abortController = new AbortController(); // AbortController, which is typically used to cancel ongoing fetch requests
    //Load Users
    async function loadUsers() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users",
          {signal: abortController.signal}
        );
        const usersFromAPI = await response.json();
        setUsers(usersFromAPI);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("aborted");
        }
      }
    }
    loadUsers();
    return () => {
      abortController.abort(); 
    }
  }, []);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadPosts(){
      

      try{
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${currentUser.id}`,
          {signal: abortController.signal}
        );
        const postsFromAPI = await response.json();
        setPosts([...postsFromAPI]);
      }catch(error){
        if (error.name === "AbortError"){
          console.log("aborted");
        }
      }
    }

    loadPosts();
    return () => {
      abortController.abort();
    }
  }, [currentUser.id]); //If this changes it reruns the useEffect

  return (
    <>
      <h2>Select a Name</h2>
      <UserList users={users} setCurrentUser={setCurrentUser}/>
      <PostList user={currentUser} posts={posts}/>
    </>
  );
}

export default App;
