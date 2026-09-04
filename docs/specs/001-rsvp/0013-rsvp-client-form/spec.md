# Goal

- basic multipage form that shows the following:
- Step 1: Check Off Guests That You are RSVPing In the flow
- Step 2: Add guest dietary preference, favorite color (HEX picker) spirit animal
- Step 3: Add email address and phone number (text for optional opt in to get text updates highly recommended)
- Step 4: success or error step, contact chelsandalsigman@gmail.com for issues.

# What Its Not

- no page level implementation yet, just the component, page stitching is later
- no search functionality this is just the form you get after you select your party
- no nice-looking ui, just a simple react multistep form that builds a response and eventually sends to an API

# Stack

- install and use Formik for the Form
- add a local storage abstraction to persist form
- simple and elegant code, YAGNI principle, rely on typescript for all things preferrable from the serverActions
