Task Title: Task management system

Description
In this task your have to develop a backend system similar to any Task Management system like Jira, Asana, or Clickup. 

Modules: 
Authentication
Project
Task(issues)

The backend should fulfil following uses cases

1. The backend should have authentication system using Email and Password
endpoint :-->> SIGN_IN - "{{baseUrl}}/user/auth/signIn"
               SIGN_UP - "{{baseUrl}}/user/auth/signUp"

2. The backend should have api endpoint for creating project and listing all projects for particular user
endpoint :-->> Create_Project - "{{baseUrl}}/user/project/create"
               List_Project - "{{baseUrl}}/user/project/list"
    In `List_Project` API there is list of all active projects createdBy logged In User.

3. The Backend should have api endpoints for listing stat
endpoint :-->> List_Stats - "{{baseUrl}}/user/stat/list"

*====----Additional APIs----====*

Update Project -->> "{{baseUrl}}/user/project/update"
Create Stat API -->> "{{baseUrl}}/user/stat/create"
Update Stat API -->> "{{baseUrl}}/user/stat/update"
Sync Default Stat API -->> "{{baseUrl}}/user/stat/syncDefaultStats"
Create Ticket API -->> "{{baseUrl}}/user/ticket/create"
List Ticket API -->> "{{baseUrl}}/user/ticket/list"
