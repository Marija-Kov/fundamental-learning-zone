#include <stdio.h>
#include <assert.h>
#include <stdlib.h>
#include <errno.h>
#include <string.h>

#define MAX_DATA 512
#define MAX_ROWS 100

// use macros to make our structs fixed-size
struct Address {
	int id;
	int set;
	char name[MAX_DATA];
	char email[MAX_DATA];
};

struct Database {
	struct Address rows[MAX_ROWS];
};

struct Connection {
	FILE *file;
	struct Database *db;
};

void die(const char *message, struct Connection *conn)
{
	if (errno) { // external variable
		perror(message);
	} else {
		printf("ERROR: %s\n", message);
	}
	if (conn) {
		if (conn->file) fclose(conn->file);
		if (conn->db) free(conn->db);
		free(conn);
		printf("freed the connection\n");
	}

	exit(1);
}

void Address_print(struct Address * addr)
{
	printf("%d %s %s\n", addr->id, addr->name, addr->email);
}

void Database_load(struct Connection *conn)
{
	// at the given address, allocate memory of the given size to store the file being read
	//Q: what is the 3rd arg (number) doing?
	int rc = fread(conn->db, sizeof(struct Database), 1, conn->file);
	if (rc != 1) {
		die("Failed to load database.", conn);
	}
}

char *cropped(const char *str, int max)
{
  char *cropped_str = malloc(max); 
	int i;
	for (i = 0; i < max - 1; i++) {
		cropped_str[i] = str[i];
	}	
	cropped_str[max - 1] = '\0';
	return cropped_str;
}	

struct Connection * Database_open(const char *filename, char mode)
{
	struct Connection * conn = malloc(sizeof(struct Connection));
	if (!conn) {
		die("Memory error", NULL);
	}
	// allocate memory for the db we're connecting to.
	//Q: where is this memory relative to memory allocated for the connection itself?
	conn->db = malloc(sizeof(struct Database));
	if (!conn->db) {
		die("Memory error", conn);
	}
	if (mode == 'c') {
		// create a write stream
		conn->file = fopen(filename, "w");
	} else {
		// create a read+write stream
		conn->file = fopen(filename, "r+");
		if (conn->file) {
			Database_load(conn);
		}
	}
	if (!conn->file) {
		die("Failed to open the file", conn);
	}
	return conn;
}

void Database_close(struct Connection * conn)
{
	if (conn) {
		if (conn->file) fclose(conn->file);
		if (conn->db) free(conn->db);
		free(conn);
	}
}

void Database_write(struct Connection * conn)
{
	rewind(conn->file);
	int rc = fwrite(conn->db, sizeof(struct Database), 1, conn->file);
	if (rc != 1) die("Failed to write database.", conn);
	rc = fflush(conn->file);
	if (rc == -1) die("Cannot flush database.", conn);
}

void Database_create(struct Connection * conn)
{
	int i = 0;
	// create rows in the database we're connecting to
	for (i = 0; i < MAX_ROWS; i++) {
		// each row in the db has its id and Address
		struct Address addr = {.id = i, .set = 0 };
		conn->db->rows[i] = addr;
	}
}

// set some data at the row with the id in the db we're connected to
void Database_set(struct Connection * conn, int id, const char * name, const char * email)
{
	// reference the address of the row
	struct Address * addr = &conn->db->rows[id];
	if (addr->set) die("Already set, delete it first", conn);
	addr->set = 1;
	// addr->name = name; // this throws error: array type 'char [512]' is not assignable
 
	// copy the email arg or the email member of the addr, limit email length to MAX_DATA
	// name[MAX_DATA] = '\0'; // 'const' sets variables to read-only so this throws error;
	
	char *cropped_email = cropped(email, MAX_DATA);
	char *res = strncpy(addr->email, cropped_email, MAX_DATA);
	if (!res) die("Email copy failed", conn);
	char *cropped_name = cropped(name, MAX_DATA);
	char *res1 = strncpy(addr->name, cropped_name, MAX_DATA);
	free(cropped_email);
	free(cropped_name);
	if (!res1) die("Name copy failed", conn);
	
}

// get stuff from the db
void Database_get(struct Connection * conn, int id)
{
	struct Address * addr = &conn->db->rows[id];
	if (addr->set) {
		Address_print(addr);
	} else {
		die("ID is not set", conn);
	}
}

// delete stuff from the db
void Database_delete(struct Connection * conn, int id)
{
	// create a temporary address to assign to target row;
	struct Address addr = {.id = id, .set = 0 };
	// C will do the copying implicitly
	// every member except .id and .set will have value 0
	conn->db->rows[id] = addr;
}

// get all data from the db we're connected to
void Database_list(struct Connection * conn)
{
	int i = 0;
	struct Database * db = conn->db;

	for (i = 0; i < MAX_ROWS; i++) {
		struct Address * cur = &db->rows[i];
		// only print non-empty rows
		if (cur->set) {
			Address_print(cur);
		}
	}
}

int main(int argc, char *argv[])
{
	if (argc < 3) die("USAGE: ex17 <dbfile> <action> [action params]", NULL);
	char *filename = argv[1];
	char action = argv[2][0];
	// connect to db
	struct Connection * conn = Database_open(filename, action);
	int id = 0;

	if (argc > 3) id = atoi(argv[3]);
	if (id >= MAX_ROWS) die("There's not that many records.", conn);

	switch (action) {
		case 'c':
			Database_create(conn);
			Database_write(conn);
			printf("New database created successfully\n");
			break;

		case 'g':
			if (argc != 4) die("Need an id to get", conn);
			Database_get(conn, id);
			break;

		case 's':
			if (argc != 6) die("Need id, name, email to set", conn);
			Database_set(conn, id, argv[4], argv[5]);
			Database_write(conn);
			printf("New data entered successfully in db: %s\n", argv[1]);
			break;

		case 'd':
			if (argc != 4) die("Need id to delete", conn);
			Database_delete(conn, id);
			Database_write(conn);
			printf("Row %s deleted successfully from db: %s\n", argv[3], argv[1]);
			break;

		case 'l':
			Database_list(conn);
			break;

		default:
			die("Invalid action: c=create, g=get, s=set, d=del, l=list", conn);
	}

	Database_close(conn);

	return 0;
}

