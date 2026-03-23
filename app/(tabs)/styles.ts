import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    paddingTop: 60,
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#999",
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  addButton: {
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#999",
    paddingVertical: 14,
    marginBottom: 20,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  itemTextContainer: {
    flex: 1,
    backgroundColor: "#17B7EB",
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  itemText: {
    fontSize: 18,
    color: "#000",
  },
  doneText: {
    textDecorationLine: "line-through",
    color: "#555",
  },
  checkButton: {
    width: 40,
    height: 40,
    marginLeft: 8,
    borderWidth: 2,
    borderColor: "#1E40FF",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  checkedButton: {
    backgroundColor: "#cfe3ff",
  },
  checkMark: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1E40FF",
  },
  deleteButton: {
    width: 40,
    height: 40,
    marginLeft: 8,
    backgroundColor: "#ff4d4d",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
});