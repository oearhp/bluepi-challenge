import { test, expect } from '@playwright/test';
import { TodoPage } from '../page/TodoPage';

test.describe('To-Do List Application Tests', () => {
    let todoPage: TodoPage;

    test.beforeEach(async ({ page }) => {
        todoPage = new TodoPage(page);
        await todoPage.navigate();
    });

    // --- UI/UX & Navigation ---

    test('UI-01: Verify Initial Layout', async () => {
        // Display "TO DO LIST"
        await expect(todoPage.header).toContainText('To Do List');

        // Input field and "Add" button are present
        await expect(todoPage.taskInput).toBeVisible();
        await expect(todoPage.addButton).toBeVisible();

        // 3 links: "Add Item", "To-Do Tasks", and "Completed" are visible
        await expect(todoPage.addItemTab).toBeVisible();
        await expect(todoPage.todoTasksTab).toBeVisible();
        await expect(todoPage.completedTab).toBeVisible();
    });

    test('UI-02: Link Navigation', async ({ page }) => {
        // 1. Click "To-Do" -> Link contains "todo"
        await todoPage.todoTasksTab.click();
        await expect(page).toHaveURL(/.*#todo/);

        // 2. Click "Completed" -> Link contains "completed"
        await todoPage.completedTab.click();
        await expect(page).toHaveURL(/.*#completed/);
    });

    // --- Functional Testing (Positive Path) ---

    test('FT-01: Add New Task', async () => {
        const taskName = 'Morning Cardio';
        await todoPage.addTask(taskName); // Steps: Click Add Item, Input, Click "+"

        const task = await todoPage.getTaskInTodo(taskName);
        await expect(task.container).toBeVisible(); // "Morning Cardio" appears in list
    });

    test('FT-02: Complete a Task', async () => {
        const taskName = 'Morning Cardio';
        await todoPage.addTask(taskName);

        // Act: Click the checkbox
        await todoPage.checkbox.click();

        const { taskText, doneIcon } = await todoPage.getTaskInCompleted(taskName);

        // 1. Verify it is visible in the completed list
        await expect(taskText).toBeVisible();

        // 2. Verify the "done" icon is present
        await expect(doneIcon).toHaveText('done');

        // 3. Verify strikethrough (Expected Result for FT-02)
        await expect(taskText).toHaveCSS('text-decoration', 'line-through');
    });

    test('FT-03: Delete a Task', async () => {
        const taskName = 'Morning Cardio';
        await todoPage.addTask(taskName);
        await todoPage.checkbox.click();
        const { container, deleteButton } = await todoPage.getTaskInCompleted(taskName);

        await deleteButton.click();

        // Assert the whole row is gone
        await expect(container).not.toBeVisible();
    });
});