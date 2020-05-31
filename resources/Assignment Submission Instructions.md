# Assignment Submission Instructions

You will be required to submit your assignments for this course through GitHub.

### Before the first assignment

1. Visit the course's repository on GitHub (https://github.com/mathematica-mpr/design-d3-training) and fork the repository into your own GitHub account.
   - This will create a copy of the course repository under your account, which will allow you to make changes without affecting the original repo.
2. Clone your forked version of the repo onto your computer:
   ```bash
   cd [YOUR LOCAL WORKSPACE]
   git clone https://github.com/[YOUR-USERNAME]/design-d3-training
   ```
3. Set the main course repository as the `upstream`:
   ```bash
   git remote add upstream https://github.com/mathematica-mpr/design-d3-training
   ```

### For each assignment

1. Get the most recent version of `upstream`
   ```bash
   git fetch upstream
   git checkout master
   git merge upstream/master
   ```
2. In the week's `Assignment` folder, create the various materials required for the assignment, committing along the way.
3. Once you have finished the assignment and committed all of your changes, make one final empty commit with a message indicating completion of the assignment:
   ```bash
   git commit --allow-empty -m "completed assignment 1"
   ```
4. Push your changes up to your fork
   ```
   git push origin master
   ```
5. Notify me that you have completed the assignment. Make sure to include the commit hash of the submission commit.
