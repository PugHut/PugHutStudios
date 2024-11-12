import tkinter as tk
from tkinter import filedialog, messagebox, ttk
from bs4 import BeautifulSoup
import os

# Function to open file dialog and select multiple files
def open_files():
    file_paths = filedialog.askopenfilenames(title="Select Files")
    if file_paths:
        files_list.delete(0, tk.END)  # Clear any existing entries
        for file_path in file_paths:
            files_list.insert(tk.END, file_path)  # Show selected files

# Function to add images to the snowflakes div in each selected file
def add_images():
    file_paths = files_list.get(0, tk.END)
    image_urls = url_entry.get().split(",")  # Get URLs as a comma-separated list

    if not file_paths or not image_urls:
        messagebox.showerror("Input Error", "Please select files and enter image URLs.")
        return

    for file_path in file_paths:
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                soup = BeautifulSoup(file, 'html.parser')

            # Locate the snowflakes div
            snowflakes_div = soup.find('div', class_='snowflakes')
            if not snowflakes_div:
                messagebox.showerror("Error", f"Could not find the 'snowflakes' div in {os.path.basename(file_path)}.")
                continue

            # Add each new image as a snowflake
            for img_url in image_urls:
                new_snowflake = soup.new_tag("div", **{"class": "snowflake"})
                img_tag = soup.new_tag("img", src=img_url.strip(), style="width:50px;height:auto;")
                new_snowflake.append(img_tag)
                snowflakes_div.append(new_snowflake)

            # Write the modified HTML back to the file
            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(str(soup))

            messagebox.showinfo("Success", f"Images added to {os.path.basename(file_path)} successfully!")

        except Exception as e:
            messagebox.showerror("Error", f"An error occurred with {os.path.basename(file_path)}: {e}")

# Set up the main Tkinter window
root = tk.Tk()
root.title("Batch Snowflake Image Adder")

# Use ttk for better styling
style = ttk.Style(root)
style.theme_use("clam")  # Change to any available themes like "clam", "alt", "default", etc.

# File selection section
ttk.Label(root, text="Select Files:").grid(row=0, column=0, padx=5, pady=5)
file_button = ttk.Button(root, text="Browse", command=open_files)
file_button.grid(row=0, column=2, padx=5, pady=5)

# Listbox to display selected files
files_list = tk.Listbox(root, width=70, height=10, selectmode=tk.MULTIPLE)
files_list.grid(row=1, column=0, columnspan=3, padx=5, pady=5)

# Image URL input section
ttk.Label(root, text="Image URLs (comma-separated):").grid(row=2, column=0, padx=5, pady=5)
url_entry = ttk.Entry(root, width=50)
url_entry.grid(row=2, column=1, padx=5, pady=5)

# Button to add images
add_button = ttk.Button(root, text="Add Images", command=add_images)
add_button.grid(row=3, column=0, columnspan=3, pady=10)

# Run the Tkinter loop
root.mainloop()
